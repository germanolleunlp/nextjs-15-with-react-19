import DebouncedAndThrottledInput from "@/app/exercises/DebouncedAndThrottledInput";
import PhoneInput from "@/app/exercises/PhoneInput";
import ASTNode from "@/app/exercises/ASTNode";
import DebouncedAndThrottledInputButtons from "@/app/exercises/DebouncedAndThrottledInputButtons";
import BusinessTime from "@/app/exercises/BusinessTime";

export default function Home() {
  return (
    <div className="flex gap-4 flex-wrap items-start flex-col">
      <div className="flex gap-4 flex-wrap align-baseline">
        <DebouncedAndThrottledInput />
        <DebouncedAndThrottledInputButtons />
        <PhoneInput />
        <BusinessTime />
      </div>
      <ASTNode />
    </div>
  );
}
