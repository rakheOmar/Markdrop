import { AlertCircle, Home } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFoundPage() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-screen items-center border-x">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="absolute inset-x-0 h-px bg-border" />
          <Empty>
            <EmptyHeader>
              <EmptyTitle className="font-black font-mono text-8xl">404</EmptyTitle>
              <EmptyDescription className="text-nowrap">
                The page you're looking for might have been <br />
                moved or doesn't exist.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button asChild>
                  <Link to="/">
                    <Home /> Go Home
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <a
                    href="https://github.com/rakheOmar/Markdrop/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AlertCircle /> Report an Issue
                  </a>
                </Button>
              </div>
            </EmptyContent>
          </Empty>
          <div className="absolute inset-x-0 h-px bg-border" />
        </motion.div>
      </div>
    </div>
  );
}
