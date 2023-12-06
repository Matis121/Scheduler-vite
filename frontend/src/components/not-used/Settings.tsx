import BasicLayout from "@/layout/BasicLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { editActiveHours, getHours } from "../../api/User";
import { useQuery } from "react-query";

const Home = () => {
  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // FETCH DATA
  const { data } = useQuery(["hours"], () => getHours(userData));

  const [newValues, setNewValues] = useState([]);

  useEffect(() => {
    setNewValues(data);
  }, [data]);

  // TOAST
  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Zadanie wykonane!",
      description: "Godziny pracy zostały zaktualizowane.",
    });
  };

  const handleInputChange = (e, idx, field) => {
    const updatedHours = [...newValues]; // Tworzenie kopii stanu
    if (field === "active") {
      if (updatedHours[idx][field] === true) {
        updatedHours[idx][field] = false;
      } else {
        updatedHours[idx][field] = true;
      }
    } else {
      updatedHours[idx][field] = e.target.value;
    }
    setNewValues(updatedHours);
  };

  const handleNewHours = async () => {
    if (!newValues) {
      return;
    }
    const res = await editActiveHours(userData, newValues);
    toastEvent();
  };

  return (
    <BasicLayout>
      <section className="bg-gray-100 w-full h-full flex flex-col gap-6">
        <span className="text-2xl font-semibold leading-6 text-gray-700 mr-6">
          Ustawienia
        </span>
        <div className="p-6 bg-white w-full shadow-md rounded-md grid grid-cols-[230px,1fr] gap-10">
          <div className=" border-r-2">
            <ul className="grid mr-4">
              <li className="py-2 px-4 font-medium text-gray-700 hover:cursor-pointer hover:bg-gray-100 hover:rounded-md">
                Profil
              </li>
              <li className="py-2 px-4 font-medium text-gray-700 hover:cursor-pointer hover:bg-gray-100 hover:rounded-md">
                Godziny pracy
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start gap-5">
            {data
              ? data.map((day, idx) => (
                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    key={idx}
                  >
                    <h2 className="mr-4">{day.dayName}</h2>
                    <div className="text-center">
                      <Checkbox
                        checked={day.active ? true : false}
                        onClick={e => handleInputChange(e, idx, "active")}
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">Od</span>
                      <Input
                        className="w-[80px] text-xl"
                        placeholder="10:00"
                        value={day.startTime}
                        onChange={e => handleInputChange(e, idx, "startTime")}
                      ></Input>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">Do</span>
                      <Input
                        className="w-[80px] text-xl"
                        placeholder="18:00"
                        value={day.endTime}
                        onChange={e => handleInputChange(e, idx, "endTime")}
                      ></Input>
                    </div>
                  </div>
                ))
              : null}
            <Button onClick={handleNewHours} className="mt-4 w-fit px-16">
              Zapisz
            </Button>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
};

export default Home;