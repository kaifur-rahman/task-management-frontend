import Avatar from "@mui/material/Avatar";
function Topbar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 z-50 flex justify-end items-center px-4 border-b-[0.5px] border-light">
      <Avatar
        sizes="small"
        sx={{ width: "2rem", height: "2rem" }}
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
      />
    </div>
  );
}

export default Topbar;
