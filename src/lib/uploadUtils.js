import { supabase } from "./supabase";

const DEFAULT_BUCKET = "markdrop-files";

export const initializeBucket = async () => {
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error("Error listing buckets:", listError);
      return { error: listError.message };
    }

    const bucketExists = buckets?.some((b) => b.name === DEFAULT_BUCKET);

    if (!bucketExists) {
      const { data, error: createError } = await supabase.storage.createBucket(DEFAULT_BUCKET, {
        public: true,
      });

      if (createError) {
        console.error("Error creating bucket:", createError);
        return { error: createError.message };
      }

      console.log("Bucket created successfully:", data);
      return { success: true, created: true };
    }

    console.log("Bucket already exists");
    return { success: true, created: false };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: err.message };
  }
};

export const uploadFile = async (file, bucket = DEFAULT_BUCKET, folder = "") => {
  try {
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return { error: "File size exceeds 10MB limit" };
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "User not authenticated" };
    }

    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const originalName = file.name.split(".").slice(0, -1).join(".");
    const extension = file.name.split(".").pop();
    const fileName = `${originalName}-${timestamp}-${randomStr}.${extension}`;

    const filePath = folder ? `${folder}/${user.id}/${fileName}` : `${user.id}/${fileName}`;

    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      return { error: error.message };
    }

    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return {
      url: publicData.publicUrl,
      path: data.path,
    };
  } catch (err) {
    return { error: err.message };
  }
};

export const uploadImage = async (file) => {
  try {
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!validImageTypes.includes(file.type)) {
      return { error: "Invalid image format. Supported: JPEG, PNG, GIF, WebP, SVG" };
    }

    return await uploadFile(file, DEFAULT_BUCKET, "images");
  } catch (err) {
    return { error: err.message };
  }
};

export const deleteFile = async (filePath, bucket = DEFAULT_BUCKET) => {
  try {
    if (!filePath) {
      return { error: "No file path provided" };
    }

    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
};

export const getSignedUrl = async (filePath, bucket = DEFAULT_BUCKET) => {
  try {
    if (!filePath) {
      return { error: "No file path provided" };
    }

    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(filePath, 3600);

    if (error) {
      return { error: error.message };
    }

    return { url: data.signedUrl };
  } catch (err) {
    return { error: err.message };
  }
};

export const ensureBucketExists = async () => {
  try {
    const { error } = await supabase.storage.from(DEFAULT_BUCKET).list("", { limit: 1 });

    if (error?.statusCode === 404) {
      const { error: createError } = await supabase.storage.createBucket(DEFAULT_BUCKET, {
        public: true,
        allowedMimeTypes: ["image/*", "application/pdf", "video/*"],
      });

      if (createError) {
        return { error: `Failed to create bucket: ${createError.message}` };
      }

      return { success: true };
    }

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
};
