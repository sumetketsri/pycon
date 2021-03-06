/** @jsx jsx */
import { Box, Button, Flex, Heading, Label, Radio } from "@theme-ui/components";
import moment from "moment";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { jsx } from "theme-ui";

import { HotelRoom } from "../../generated/graphql-backend";
import { Alert } from "../alert";
import { HotelForm } from "../hotel-form";
import { TicketsForm } from "../tickets-form";
import { Ticket } from "../tickets-form/types";
import {
  InvoiceInformationState,
  OrderState,
  SelectedHotelRooms,
  SelectedProducts,
} from "./types";
import { hasSelectedAtLeastOneProduct } from "./utils";

type Props = {
  state: OrderState;
  tickets: Ticket[];
  hotelRooms: HotelRoom[];
  conferenceStart: string;
  conferenceEnd: string;
  selectedProducts: SelectedProducts;
  selectedHotelRooms: SelectedHotelRooms;
  default: boolean;
  invoiceInformation: InvoiceInformationState;
  onNextStep: () => void;
  addProduct: (id: string, variation?: string) => void;
  removeProduct: (id: string, variation?: string) => void;
  addHotelRoom: (
    id: string,
    checkin: moment.Moment,
    checkout: moment.Moment,
  ) => void;
  removeHotelRoom: (id: string, index: number) => void;
  onUpdateIsBusiness: (isBusiness: boolean) => void;
};

export const TicketsSection: React.SFC<Props> = ({
  tickets,
  state,
  hotelRooms,
  conferenceStart,
  conferenceEnd,
  addHotelRoom,
  removeHotelRoom,
  selectedProducts,
  selectedHotelRooms,
  addProduct,
  removeProduct,
  onNextStep,
  invoiceInformation,
  onUpdateIsBusiness,
}) => {
  const [shouldShowNoTickets, setShouldShowNoTickets] = useState(false);

  const onContinue = () => {
    if (hasSelectedAtLeastOneProduct(state)) {
      return onNextStep();
    }

    setShouldShowNoTickets(true);
  };

  return (
    <React.Fragment>
      <Box sx={{ borderBottom: "primary", pb: 5 }}>
        <Flex
          sx={{
            maxWidth: "container",
            mx: "auto",
            px: 3,

            flexDirection: ["column", "row"],
            justifyContent: ["flex-start", "space-between"],
            alignItems: ["flex-start", "center"],
          }}
        >
          <Heading as="h1">
            <FormattedMessage id="tickets.heading" />
          </Heading>

          <Flex mt={[3, 0]} sx={{ display: ["block", "flex"] }}>
            <Label
              sx={{
                width: "auto",
                mr: [0, 3],
                color: "green",
                fontWeight: "bold",
              }}
            >
              <Radio
                name="isBusiness"
                onChange={() => onUpdateIsBusiness(false)}
                checked={!invoiceInformation.isBusiness}
              />
              <FormattedMessage id="orderInformation.individualConsumer" />
            </Label>
            <Label
              sx={{
                width: "auto",
                mr: [0, 3],
                mt: [3, 0],
                color: "green",
                fontWeight: "bold",
              }}
            >
              <Radio
                name="isBusiness"
                onChange={() => onUpdateIsBusiness(true)}
                checked={invoiceInformation.isBusiness}
              />
              <FormattedMessage id="orderInformation.businessConsumer" />
            </Label>
          </Flex>
        </Flex>
      </Box>

      <Box
        sx={{
          maxWidth: "container",
          mx: "auto",
          px: 3,
          mt: 5,
        }}
      >
        {tickets && (
          <TicketsForm
            isBusiness={invoiceInformation.isBusiness}
            tickets={tickets}
            selectedProducts={selectedProducts}
            addProduct={addProduct}
            removeProduct={removeProduct}
          />
        )}

        {hotelRooms && (
          <HotelForm
            selectedHotelRooms={selectedHotelRooms}
            conferenceStart={conferenceStart}
            conferenceEnd={conferenceEnd}
            hotelRooms={hotelRooms}
            addHotelRoom={addHotelRoom}
            removeHotelRoom={removeHotelRoom}
          />
        )}

        {shouldShowNoTickets && (
          <Alert variant="alert">
            <FormattedMessage id="order.needToSelectProducts" />
          </Alert>
        )}

        <Button onClick={onContinue}>
          <FormattedMessage id="order.nextStep" />
        </Button>
      </Box>
    </React.Fragment>
  );
};
