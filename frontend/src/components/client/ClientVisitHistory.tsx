import { getClients, getEvents } from "../../api/User";
import { useQuery, useQueryClient } from "react-query";
import BasicLayout from "@/layout/BasicLayout";
import { useParams } from "react-router-dom";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClientVisitHistory = () => {
  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  const { clientId } = useParams();

  // FETCH DATA
  const { data: clientsData } = useQuery(["clients"], () =>
    getClients(userData)
  );
  const { data: eventsData } = useQuery(["events"], () => getEvents(userData));

  return (
    <BasicLayout>
      <section className="flex flex-col w-full h-full gap-6">
        <div className="px-1 flex items-center">
          <span className="text-2xl font-semibold leading-6 text-gray-700 mr-6">
            Historia wizyt
          </span>
        </div>
        <div className="overflow-y-auto shadow-md rounded-md">
          <Table className="bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Godzina</TableHead>
                <TableHead>Usługa</TableHead>
                <TableHead>Wartość</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notatka</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventsData.map((element, idx) =>
                element.clientId === clientId ? (
                  <TableRow>
                    <TableCell>{element.date}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{element.serviceName}</TableCell>
                    <TableCell>{element.servicePrice} zł</TableCell>
                    <TableCell>
                      <p
                        className={`"py-1 px-2 w-fit rounded-md flex items-center gap-1 text-base" ${
                          element.eventStatus === "created"
                            ? "bg-blue-200 text-blue-900"
                            : element.eventStatus === "finalized"
                            ? "bg-green-200 text-green-900"
                            : element.eventStatus === "canceled"
                            ? "bg-red-200 text-red-900"
                            : ""
                        }`}
                      >
                        {element.eventStatus === "created"
                          ? "Potwierdzona"
                          : element.eventStatus === "finalized"
                          ? "Zakończona"
                          : element.eventStatus === "canceled"
                          ? "Anulowana"
                          : ""}
                      </p>
                    </TableCell>
                    <TableCell>
                      {element.description ? (
                        <HoverCard>
                          <HoverCardTrigger>Zobacz notatkę</HoverCardTrigger>
                          <HoverCardContent>
                            {element.description}
                          </HoverCardContent>
                        </HoverCard>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </BasicLayout>
  );
};

export default ClientVisitHistory;
