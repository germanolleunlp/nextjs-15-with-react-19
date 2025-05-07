import DebouncedAndThrottledInput from "@/app/exercises/DebouncedAndThrottledInput";
import PhoneInput from "@/app/exercises/PhoneInput";
import ASTNode from "@/app/exercises/ASTNode";
import DebouncedAndThrottledInputButtons from "@/app/exercises/DebouncedAndThrottledInputButtons";
import BusinessTime from "@/app/exercises/BusinessTime";

export default function Home() {
  return (
    <div className="flex gap-4 flex-wrap items-start flex-col w-300">
      <div className="flex gap-4 flex-wrap">
        <DebouncedAndThrottledInput />
        <DebouncedAndThrottledInputButtons />
        <PhoneInput />
        <BusinessTime />
      </div>
      <ASTNode />
    </div>
  );
}
