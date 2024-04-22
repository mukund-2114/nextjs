import Card from "@/components/Card";
import Link from "next/link";

export default function Notifications(){
    return(
        <Card>
            <div>Notification</div>
            <Link href={'/complex-dashboard/archieved'}> Archieved Notification</Link>
        </Card>
    )
}