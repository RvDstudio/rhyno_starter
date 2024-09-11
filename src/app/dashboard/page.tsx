import { FrontFile } from "@/src/components/FrontFile";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/src/components/ui/breadcrumb";

export default function Dashboard() {
  return (
    <>
      <div className="pt-6 pl-10 pr-8 pb-10 bg-[#FAFAFA] dark:bg-[#171717] flex flex-1 flex-col p-4 lg:p-6">
        <Breadcrumb className="pl-4">
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
