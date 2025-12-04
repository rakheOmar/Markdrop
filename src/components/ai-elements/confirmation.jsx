"use client";

import { createContext, useContext } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ConfirmationContext = createContext(null);

const useConfirmation = () => {
  const context = useContext(ConfirmationContext);

  if (!context) {
    throw new Error("Confirmation components must be used within Confirmation");
  }

  return context;
};

export const Confirmation = ({ className, approval, state, ...props }) => {
  if (!approval || state === "input-streaming" || state === "input-available") {
    return null;
  }

  return (
    <ConfirmationContext.Provider value={{ approval, state }}>
      <Alert className={cn("flex flex-col gap-2", className)} {...props} />
    </ConfirmationContext.Provider>
  );
};

export const ConfirmationTitle = ({ className, ...props }) => (
  <AlertDescription className={cn("inline", className)} {...props} />
);

export const ConfirmationRequest = ({ children }) => {
  const { state } = useConfirmation();

  // Only show when approval is requested
  if (state !== "approval-requested") {
    return null;
  }

  return children;
};

export const ConfirmationAccepted = ({ children }) => {
  const { approval, state } = useConfirmation();

  // Only show when approved and in response states
  if (
    !approval?.approved ||
    (state !== "approval-responded" && state !== "output-denied" && state !== "output-available")
  ) {
    return null;
  }

  return children;
};

export const ConfirmationRejected = ({ children }) => {
  const { approval, state } = useConfirmation();

  // Only show when rejected and in response states
  if (
    approval?.approved !== false ||
    (state !== "approval-responded" && state !== "output-denied" && state !== "output-available")
  ) {
    return null;
  }

  return children;
};

export const ConfirmationActions = ({ className, ...props }) => {
  const { state } = useConfirmation();

  // Only show when approval is requested
  if (state !== "approval-requested") {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-end gap-2 self-end", className)} {...props} />
  );
};

export const ConfirmationAction = (props) => (
  <Button className="h-8 px-3 text-sm" type="button" {...props} />
);
