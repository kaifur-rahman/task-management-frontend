type TAccountStatus = {
  status: string;
};

function AccountStatus({ status }: TAccountStatus) {
  return (
    <div
      className={`${
        status === "Active"
          ? "bg-[#E2FFDF]"
          : status === "Inactive"
          ? "bg-[#FFE7DF]"
          : ""
      } rounded-3xl  w-fit p-1 px-3 ${
        status === "Active"
          ? "text-[#0C9300]"
          : status === "Inactive"
          ? "text-[#932200]"
          : ""
      }`}
    >
      <h6 className="font-light break-words">{status}</h6>
    </div>
  );
}

export default AccountStatus;
