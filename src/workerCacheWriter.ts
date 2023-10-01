import { Logger } from "@nestjs/common";
import axios, { AxiosError } from "axios";
const workerCacheWriter = async () => {
  const logger = new Logger(workerCacheWriter.name);
  //gravar o cache inicial na rota de produtos
  const URL_AUTHORIZATION = String(process.env.URL_AUTHORIZATION);
  const url = `${URL_AUTHORIZATION.split("/")[0]}//${
    URL_AUTHORIZATION.split("/")[2]
  }`;
  logger.log("Gravando Cache Inicial nas rotas mais pesadas ");
  const acess_token = (
    await axios.post(URL_AUTHORIZATION, {
      client_id: String(process.env.clientId),
      client_secret: String(process.env.clientSecret),
    })
  ).data.access_token;
  axios
    .get(`${url}/listar-produtos`, {
      headers: {
        Authorization: `Bearer ${acess_token}`,
      },
    })
    .then((res) => {
      logger.log(`• /listar-produtos - ${res.status} - OK - cache gravado`);
    })
    .catch((err: AxiosError) => {
      logger.error(
        `• /listar-produtos - ${err.message} - cache inicial não gravado `
      );
    });
  axios
    .get(`${url}/listar-clientes`, {
      headers: {
        Authorization: `Bearer ${acess_token}`,
      },
    })
    .then((res) => {
      logger.log(`• /listar-clientes - ${res.status} - OK - cache gravado`);
    })
    .catch((err: AxiosError) => {
      logger.error(
        `• /listar-clientes - ${err.message} - cache inicial não gravado `
      );
    });
  axios
    .get(`${url}/listar-pedidos`, {
      headers: {
        Authorization: `Bearer ${acess_token}`,
      },
    })
    .then((res) => {
      logger.log(`• /listar-pedidos - ${res.status} - OK - cache gravado`);
    })
    .catch((err: AxiosError) => {
      logger.error(
        `• /listar-pedidos - ${err.message} - cache inicial não gravado `
      );
    });
  axios
    .get(`${url}/imagem`, {
      headers: {
        Authorization: `Bearer ${acess_token}`,
      },
    })
    .then((res) => {
      logger.log(`• /imagem - ${res.status} - OK - cache gravado`);
    })
    .catch((err: AxiosError) => {
      logger.error(`• /imagem - ${err.message} - cache inicial não gravado `);
    });
  axios
    .get(`${url}/listar-recomendacoes`, {
      headers: {
        Authorization: `Bearer ${acess_token}`,
      },
    })
    .then((res) => {
      logger.log(
        `• /listar-recomendacoes - ${res.status} - OK - cache gravado`
      );
    })
    .catch((err: AxiosError) => {
      logger.error(
        `• /listar-recomendacoes - ${err.message} - cache inicial não gravado `
      );
    });
};
export default workerCacheWriter;
