import { FrontFile } from "@/components/FrontFile";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function Dashboard() {
  return (
    <>
      <div className="bg-[#FAFAFA] dark:bg-[#171717] flex flex-1 flex-col p-4 lg:p-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <FrontFile />
      </div>
    </>
  );
}
