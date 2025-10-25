import { ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NumberInput = forwardRef(
  (
    {
      value: controlledValue,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      step = 1,
      prefix,
      suffix,
      decimalScale = 0,
      fixedDecimalScale = false,
      thousandSeparator,
      placeholder,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(controlledValue ?? defaultValue);

    const increment = useCallback(() => {
      setValue((prev) => (prev === undefined ? step : Math.min(prev + step, max)));
    }, [step, max]);

    const decrement = useCallback(() => {
      setValue((prev) => (prev === undefined ? -step : Math.max(prev - step, min)));
    }, [step, min]);

    // Update controlled value
    useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    // Keyboard arrow support
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (document.activeElement === ref?.current) {
          if (e.key === "ArrowUp") increment();
          else if (e.key === "ArrowDown") decrement();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [increment, decrement, ref]);

    const handleChange = (values) => {
      const newValue = values.floatValue;
      setValue(newValue);
      onValueChange?.(newValue);
    };

    const handleBlur = () => {
      if (value !== undefined) {
        let newValue = value;
        if (value < min) newValue = min;
        else if (value > max) newValue = max;
        setValue(newValue);
      }
    };

    return (
      <div className="flex items-center">
        <NumericFormat
          value={value}
          onValueChange={handleChange}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          thousandSeparator={thousandSeparator}
          allowNegative={min < 0}
          valueIsNumericString
          onBlur={handleBlur}
          prefix={prefix}
          suffix={suffix}
          customInput={Input}
          placeholder={placeholder}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-r-none relative"
          getInputRef={ref}
          {...props}
        />

        <div className="flex flex-col">
          <Button
            aria-label="Increase value"
            className="px-2 h-5 rounded-l-none rounded-br-none border-input border-l-0 border-b-[0.5px] focus-visible:relative"
            variant="outline"
            onClick={increment}
            disabled={value === max}
          >
            <ChevronUp size={15} />
          </Button>
          <Button
            aria-label="Decrease value"
            className="px-2 h-5 rounded-l-none rounded-tr-none border-input border-l-0 border-t-[0.5px] focus-visible:relative"
            variant="outline"
            onClick={decrement}
            disabled={value === min}
          >
            <ChevronDown size={15} />
          </Button>
        </div>
      </div>
    );
  }
);
