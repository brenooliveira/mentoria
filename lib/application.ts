export type ApplicationSubmission = {
  name: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  role: string;
  company: string;
  stage: string;
  challenge: string;
  goal90Days: string;
  investmentReadiness: string;
  source: string;
  consent: boolean;
  website: string;
  startedAt: number;
};

export interface ApplicationGateway {
  submit(application: ApplicationSubmission): Promise<void>;
}

export function createApplicationGateway(config: {
  mode: "preview" | "endpoint";
  destination: string;
}): ApplicationGateway {
  if (config.mode === "endpoint" && !config.destination.startsWith("[")) {
    return {
      async submit(application) {
        const response = await fetch(config.destination, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(application),
        });

        if (!response.ok) {
          throw new Error("Não foi possível enviar sua candidatura agora.");
        }
      },
    };
  }

  return {
    async submit() {
      await new Promise((resolve) => setTimeout(resolve, 900));
    },
  };
}
