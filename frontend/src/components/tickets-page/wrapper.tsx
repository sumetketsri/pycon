/** @jsx jsx */
import { Box, Text } from "@theme-ui/components";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { jsx } from "theme-ui";

import { useLoginState } from "~/app/profile/hooks";
import { Alert } from "~/components/alert";
import { MetaTags } from "~/components/meta-tags";
import { useCurrentLanguage } from "~/locale/context";
import { TicketsQueryResult, useTicketsQuery } from "~/types";

import { useCart } from "./use-cart";
import {
  hasAnsweredTicketsQuestions,
  hasOrderInformation,
  hasSelectedAtLeastOneProduct,
} from "./utils";

type Props = {
  children: (props: {
    tickets: TicketsQueryResult["data"]["conference"]["tickets"];
    hotelRooms: TicketsQueryResult["data"]["conference"]["hotelRooms"];
    conference: TicketsQueryResult["data"]["conference"];
    me: TicketsQueryResult["data"]["me"];
  }) => React.ReactElement;
};

export const TicketsPageWrapper: React.SFC<Props> = ({ children }) => {
  const code = process.env.conferenceCode;
  const language = useCurrentLanguage();
  const [isLoggedIn] = useLoginState();

  const { loading, error, data } = useTicketsQuery({
    variables: {
      conference: code,
      language,
      isLogged: isLoggedIn,
    },
  });

  const hotelRooms = data?.conference.hotelRooms || [];
  const tickets = data?.conference.tickets || [];
  const conference = data?.conference;
  const me = data?.me;

  const { state } = useCart();

  useEffect(() => {
    const isHome = location.pathname.endsWith("tickets/");

    if (isHome) {
      return;
    }

    const isReview = location.pathname.endsWith("review/");

    if (!isReview) {
      return;
    }

    if (!isLoggedIn) {
      // TODO:!!1
      // props.navigate!(`/${language}/login`, { replace: true });
      return;
    }

    if (!hasSelectedAtLeastOneProduct(state)) {
      // TODO:!!1
      // props.navigate!("", { replace: true });
      return;
    }

    if (!hasOrderInformation(state)) {
      // TODO:!!1
      // props.navigate!("information", { replace: true });
      return;
    }

    if (tickets.length > 0 && !hasAnsweredTicketsQuestions(state, tickets)) {
      // TODO:!!1
      // props.navigate!("questions", { replace: true });
      return;
    }
  }, [typeof location === "undefined" ? null : location.pathname, tickets]);

  if (error) {
    return (
      <Box
        sx={{
          maxWidth: "container",
          mx: "auto",
          px: 3,
        }}
      >
        <Alert variant="alert">{error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box mb={5}>
      <FormattedMessage id="tickets.pageTitle">
        {(text) => <MetaTags title={text} />}
      </FormattedMessage>

      <Box
        sx={{
          borderTop: "primary",
          pt: 5,
        }}
      >
        {loading && (
          <Box
            sx={{
              maxWidth: "container",
              mx: "auto",
              px: 3,
            }}
          >
            <Text>
              <FormattedMessage id="tickets.loading" />
            </Text>
          </Box>
        )}

        {!loading && children({ tickets, hotelRooms, conference, me })}
      </Box>
    </Box>
  );
};