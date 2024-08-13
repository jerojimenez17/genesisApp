"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Status } from "@/models/Order";
import { useState } from "react";

interface OrderStatusPopoverProps {
  initialStatus: Status;
  children: React.ReactNode;
  onChangeStatus: (newStatus: Status) => void;
}

const OrderStatusPopover: React.FC<OrderStatusPopoverProps> = ({
  initialStatus,
  onChangeStatus,
  children,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<Status>(initialStatus);

  const handleStatusChange = (status: Status) => {
    setSelectedStatus(status);
    onChangeStatus(status);
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <Checkbox
              checked={selectedStatus === "confirmado"}
              onCheckedChange={() => handleStatusChange(Status.confirmado)}
              id="confirmado"
            />
            <Label htmlFor="confirmado" className="ml-2">
              Confirmado
            </Label>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={selectedStatus === "pendiente"}
              onCheckedChange={() => handleStatusChange(Status.pendiente)}
              id="pendiente"
            />
            <Label htmlFor="pendiente" className="ml-2">
              Pendiente
            </Label>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={selectedStatus === "entregado"}
              onCheckedChange={() => handleStatusChange(Status.entregado)}
              id="entregado"
            />
            <Label htmlFor="entregado" className="ml-2">
              Entregado
            </Label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OrderStatusPopover;
