import { getUserFirstNameLastNameChar } from "@/actions/user/avatarDetails";

async function Topbar() {
  const firstAndLastChar = await getUserFirstNameLastNameChar();
  return (
    <div className="fixed top-0 left-0 right-0 h-12 z-50 flex justify-end items-center px-4 border-b-[0.5px] border-light bg-secondary">
      {firstAndLastChar != "" && (
        <div className="bg-gray-300 w-9 h-9 rounded-full flex justify-center items-center">
          {firstAndLastChar}
        </div>
      )}
    </div>
  );
}

export default Topbar;
