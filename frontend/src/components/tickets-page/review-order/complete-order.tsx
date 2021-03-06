/** @jsx jsx */
import { Box, Button, Flex, Heading, Input, Text } from "@theme-ui/components";
import React, { Fragment, useCallback, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { jsx } from "theme-ui";

import { useCurrentLanguage } from "../../../context/language";
import { HotelRoom } from "../../../generated/graphql-backend";
import { Ticket } from "../../tickets-form/types";
import { OrderState, SelectedHotelRooms } from "../types";
import { CreateOrderButtons } from "./create-order-buttons";
import { calculateTotalAmount } from "./prices";

type Props = {
  email: string;
  state: OrderState;
  hotelRoomsById: {
    [x: string]: HotelRoom;
    [x: number]: HotelRoom;
  };
  productsById: {
    [x: string]: Ticket;
    [x: number]: Ticket;
  };
};

export const CompleteOrder: React.SFC<Props> = ({
  email,
  state,
  productsById,
  hotelRoomsById,
}) => {
  const lang = useCurrentLanguage();
  const totalAmount = calculateTotalAmount(state, productsById, hotelRoomsById);
  const moneyFormatter = new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "EUR",
  });

  return (
    <Box sx={{ py: 5, borderTop: "primary" }}>
      <Box
        sx={{
          maxWidth: "container",
          mx: "auto",
          px: 3,
        }}
      >
        <Heading
          as="h2"
          sx={{
            color: "orange",
            textTransform: "uppercase",
            mb: 4,
            fontWeight: "bold",
          }}
        >
          <FormattedMessage id="orderReview.total" />
        </Heading>

        <Box
          sx={{
            maxWidth: "660px",
            borderTop: "primary",
            borderBottom: "primary",
            mt: 4,
            py: 3,
          }}
        >
          <Text
            sx={{
              fontSize: 4,
              fontWeight: "bold",
            }}
          >
            <FormattedMessage
              id="orderReview.totalAmount"
              values={{
                total: moneyFormatter.format(totalAmount),
              }}
            />
          </Text>
        </Box>

        <CreateOrderButtons email={email} state={state} />
      </Box>
    </Box>
  );
};
