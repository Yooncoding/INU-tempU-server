import joi from "joi";

const schema = {
  login: joi.object({
    id: joi.string().required(),
    password: joi.string().required(),
  }),

  postEdit: joi.object({
    nickname: joi
      .string()
      .regex(/^[가-힣|a-z|A-Z|0-9|]{2,8}$/)
      .required(), // 특수문자 제외 2~8글자
  }),
};

export default schema;
