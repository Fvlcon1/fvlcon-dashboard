import { notFound } from "next/navigation";
import '../components/style.css'
import { getFvlconizationLogs } from "../utils/getFvlconizationLogs";

const Printable = async ({ params }: { params: { id: string } }) => {
  const recordId = params.id;
  const logs = await getFvlconizationLogs()
  console.log({logs})

  return (
    <div
      className="w-full max-w-[800px] bg-white rounded-t-lg mt-[20px]"
    >

    </div>
  )
}

export default Printable