import { listPopups } from "@/lib/keystatic-reader";
import { PopupManager } from "@/components/popups/PopupManager";

export async function PopupWithContent() {
    const popups = await listPopups();
    return <PopupManager popups={popups} />;
}
