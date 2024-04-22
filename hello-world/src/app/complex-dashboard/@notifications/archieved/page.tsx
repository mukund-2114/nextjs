import Card from "@/components/Card";
import Link from "next/link";

export default function ArchievedNotifications(){
    return(
        <Card>
            <div>Archieved Notification</div>
            <Link href={'/complex-dashboard'}> Default Notification</Link>
        </Card>
    )
}