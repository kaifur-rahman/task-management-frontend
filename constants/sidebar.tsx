import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";

export const navItems = [
  { name: "Dashboard", url: "/", Icon: HomeOutlinedIcon },
  { name: "Team", url: "/team", Icon: GroupsOutlinedIcon },
  { name: "Tasks", url: "/tasks", Icon: TaskOutlinedIcon },
  { name: "Products", url: "/products", Icon: Inventory2OutlinedIcon },
  { name: "Projects", url: "/projects", Icon: LayersOutlinedIcon },
  {
    name: "Suppliers",
    url: "/suppliers",
    Icon: AirportShuttleOutlinedIcon,
  },
  {
    name: "Purchase Requests",
    url: "/purchase-requests",
    Icon: ShoppingCartOutlinedIcon,
  },
];
