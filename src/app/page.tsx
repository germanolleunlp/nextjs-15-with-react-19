import DebouncedAndThrottledInput from "@/app/exercises/DebouncedAndThrottledInput";
import PhoneInput from "@/app/exercises/PhoneInput";
import ASTNode from "@/app/exercises/ASTNode";

export default function Home() {
  return (
    <div className="flex gap-4 flex-wrap items-start flex-col sm:flex-row">
      <DebouncedAndThrottledInput />
      <PhoneInput />
      <ASTNode />
    </div>
  );
}
