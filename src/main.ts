import { init } from "./init"
import { getAllAnswersList } from "./getAllAnswersList/getAllAnswersList"

const initState = init();

if (!initState) process.exit(1)

const start = async () => {
  await getAllAnswersList()
  process.exit(1)
}
start()
