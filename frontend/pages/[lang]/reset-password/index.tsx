/** @jsx jsx */
import { Box, Button, Heading, Input } from "@theme-ui/components";
import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useFormState } from "react-use-form-state";
import { jsx } from "theme-ui";

import { Alert } from "~/components/alert";
import { InputWrapper } from "~/components/input-wrapper";
import { useRequestPasswordResetMutation } from "~/types";

type FormFields = {
  email: string;
};

export default () => {
  const [formState, { email }] = useFormState<FormFields>(
    {},
    {
      withIds: true,
    },
  );

  const [
    sendResetPassword,
    { loading, error, data },
  ] = useRequestPasswordResetMutation();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (loading || !formState.validity) {
        return;
      }

      sendResetPassword({
        variables: {
          email: formState.values.email,
        },
      });
    },
    [loading, formState],
  );

  return (
    <Box
      sx={{
        maxWidth: "container",
        mx: "auto",
        px: 3,
      }}
    >
      <Heading mb={4} as="h1">
        <FormattedMessage id="requestResetPassword.passwordForgotten" />
      </Heading>

      {loading && (
        <Alert
          sx={{
            mb: 3,
          }}
          variant="info"
        >
          <FormattedMessage id="login.waitWhileSendingResetPasswordRequest" />
        </Alert>
      )}

      {error && (
        <Alert
          sx={{
            mb: 3,
          }}
          variant="alert"
        >
          {error.message}
        </Alert>
      )}

      {data?.requestPasswordReset.__typename === "OperationResult" &&
        data.requestPasswordReset.ok && (
          <Alert
            sx={{
              mb: 3,
            }}
            variant="success"
          >
            <FormattedMessage id="login.checkYourEmails" />
          </Alert>
        )}

      <Box as="form" onSubmit={onSubmit}>
        <InputWrapper
          label={<FormattedMessage id="requestResetPassword.email" />}
        >
          <Input required={true} {...email("email")} />
        </InputWrapper>
        <Button>Send email</Button>
      </Box>
    </Box>
  );
};