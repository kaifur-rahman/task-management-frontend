import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";

export const navItems = [
  { name: "Dashboard", url: "/", Icon: HomeOutlinedIcon, paths: ["/"] },
  {
    name: "Team",
    url: "/team",
    Icon: GroupsOutlinedIcon,
    paths: ["/team"],
  },
  {
    name: "Tasks",
    url: "/tasks",
    Icon: TaskOutlinedIcon,
    paths: ["/tasks"],
  },
  {
    name: "Stock List",
    url: "/stock-list",
    Icon: Inventory2OutlinedIcon,
    paths: ["/stock-list"],
  },
  {
    name: "Projects",
    url: "/projects",
    Icon: LayersOutlinedIcon,
    paths: ["/projects", "/projects/all"],
  },
  {
    name: "Suppliers",
    url: "/suppliers",
    Icon: AirportShuttleOutlinedIcon,
    paths: ["/suppliers"],
  },
  {
    name: "Purchase Requests",
    url: "/purchase-requests",
    Icon: ShoppingCartOutlinedIcon,
    paths: ["/purchase-requests"],
  },
];
