const CLASSIFICATION_API_URL = "http://localhost:5000"; // Main API URL

export const classifyImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch(`${CLASSIFICATION_API_URL}/classify-upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Classification failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Image classification error:", error);
    return {
      success: false,
      error: error.message,
      prediction: null,
    };
  }
};

export const classifyImageFromUrl = async (imageUrl) => {
  try {
    const response = await fetch(`${CLASSIFICATION_API_URL}/classify-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_url: imageUrl }), // Fixed: wrap in object
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Classification failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Image classification error:", error);
    return {
      success: false,
      error: error.message,
      prediction: null,
    };
  }
};

export const checkClassificationAPI = async () => {
  try {
    const response = await fetch(`${CLASSIFICATION_API_URL}/health`);
    if (response.ok) {
      const data = await response.json();
      // Fixed: check the correct field name
      return (
        data.classifier_available ||
        data.services?.image_classification?.status === "available" ||
        false
      );
    }
    return false;
  } catch (error) {
    console.error("Classification API check failed:", error);
    return false;
  }
};

export const getAvailableCategories = async () => {
  try {
    const response = await fetch(`${CLASSIFICATION_API_URL}/categories`);
    if (response.ok) {
      const data = await response.json();
      return data.categories || data.class_names || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to get categories:", error);
    return [];
  }
};

export const classifyMultipleImages = async (imageFiles) => {
  if (!imageFiles || imageFiles.length === 0) {
    return { success: false, prediction: null };
  }

  try {
    const isAvailable = await checkClassificationAPI();
    if (!isAvailable) {
      return { success: false, prediction: null, error: "Classification API not available" };
    }

    const results = await Promise.all(imageFiles.map((file) => classifyImage(file)));

    const successfulResults = results.filter((result) => result.success && result.prediction);

    if (successfulResults.length === 0) {
      return { success: false, prediction: null, error: "No successful classifications" };
    }

    const bestResult = successfulResults.reduce((best, current) => {
      const currentConfidence = current.prediction?.confidence || 0;
      const bestConfidence = best.prediction?.confidence || 0;
      return currentConfidence > bestConfidence ? current : best;
    });

    return bestResult;
  } catch (error) {
    console.error("Multiple image classification error:", error);
    return { success: false, prediction: null, error: error.message };
  }
};

export const mapPredictionToCategory = (prediction) => {
  if (!prediction || !prediction.category) {
    return "other";
  }

  const categoryMapping = {
    garbage: "garbage",
    pothole: "pothole",
    water: "water",
    other: "other",
  };

  return categoryMapping[prediction.category] || "other";
};

export const getConfidenceDescription = (confidence) => {
  if (confidence >= 0.8) return "Very High";
  if (confidence >= 0.6) return "High";
  if (confidence >= 0.4) return "Medium";
  if (confidence >= 0.2) return "Low";
  return "Very Low";
};

export const testClassificationAPI = async () => {
  try {
    const response = await fetch(`${CLASSIFICATION_API_URL}/health`);
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        status: data.services?.image_classification?.status || "unknown",
        available_classes: data.services?.image_classification?.available_classes || [],
        model_path: data.services?.image_classification?.model_path || null,
        message: "API is reachable",
      };
    } else {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
        message: "API returned error",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: "Failed to connect to API",
    };
  }
};
