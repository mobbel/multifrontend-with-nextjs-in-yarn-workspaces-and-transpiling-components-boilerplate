import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface ILoginStepOn {
  onSubmit: SubmitHandler<FieldValues>;
}

export default ({ onSubmit }: ILoginStepOn) => {
  const { t } = useTranslation("common");
  const { register, handleSubmit } = useForm();

  return (
    <>
      <h2 className="text-lg font-bold text-center mb-7">
        1. {t("enterEmail")}:
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="h-4 leading-4 block text-sm">
          {t("emailAdress")}:
        </label>
        <div className="w-full h-8 border-solid border-2 rounded px-2 mt-2">
          <input
            className="w-full h-5 leading-5 focus:outline-none"
            type="email"
            placeholder="your@email.com"
            {...register("email")}
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
