import { routesString } from "@/shared/constants/routesString";
import Link from "next/link";

const ProfileBtn = ({ userId }: { userId: string }) => {
  return (
    <Link
      href={`${routesString.dashboard}/${userId}${routesString.profile}`}
      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
    >
      Profile User
    </Link>
  );
};

export default ProfileBtn;
