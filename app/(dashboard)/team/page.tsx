import ComingSoon from "@/components/common/ComingSoon";
import TeamDataTable from "@/components/team/TeamDataTable";
import { getUserRole } from "@/utils/extractDetailsFromToken";

async function page() {
  const userRole = await getUserRole();

  if (userRole === "Admin") {
    return <TeamDataTable />;
  } else {
    return (
      <ComingSoon
        title="Team"
        subtitle="Connect with your team members and view project-wise collaborations."
      />
    );
  }
}

export default page;
