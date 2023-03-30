import { useTranslation } from "next-i18next";
import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface ILoginStepOn {
  onSubmit: ({}: any) => void;
  email: string;
  mandatory: {
    name: string;
    id: string;
  };
}

export default ({ onSubmit, email, mandatory }: ILoginStepOn) => {
  const { t } = useTranslation("common");
  const { register, handleSubmit } = useForm();

  // we need this to avoid wrong data
  const onSubmitAll: SubmitHandler<FieldValues> = useCallback((data) => {
    onSubmit(data);
  }, []);

  return (
    <>
      <h2 className="text-lg font-bold text-center mb-7">
        2. {t("wichOrganisation")}:
      </h2>
      <form onSubmit={handleSubmit(onSubmitAll)}>
        <div className="hidden">
          <input type="hidden" value={email} {...register("email")} />
        </div>
        <div className="hidden">
          <input
            type="hidden"
            value={mandatory.id}
            {...register("mandatoryId")}
          />
        </div>
        <label className="h-4 leading-4 mt-5 block text-sm">
          {t("password")}:
        </label>
        <div className="w-full h-8 border-solid border-2 rounded px-2 mt-2">
          <input
            className="w-full h-5 leading-5 focus:outline-none"
            type="password"
            {...register("password")}
          />
        </div>
        <input
          className="w-full mt-3 bg-lime-500 rounded font-semibold h-8 leading-8"
          type="submit"
        />
      </form>
    </>
  );
};
