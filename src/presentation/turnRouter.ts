import express from 'express'
import { toDisc } from '../domain/model/turn/disc'
import { Point } from '../domain/model/turn/point'
import { TurnMySQLRepository } from '../infrastructure/repository/turn/turnMySQLRepository'
import { GameMySQLRepository } from '../infrastructure/repository/game/gameMySQLRepository'
import { GameResultMySQLRepository } from '../infrastructure/repository/gameResult/gameResultMySQLRepository'
import { RegisterTurnUseCase } from '../application/useCase/registerTurnUseCase'
import { FindLatestGameTurnByTurnCountUseCase } from '../application/useCase/FindLatestGameTurnByTurnCountUseCase'

export const turnRouter = express.Router()

const findLatestGameTurnByTurnCount = new FindLatestGameTurnByTurnCountUseCase(
	new TurnMySQLRepository(),
	new GameMySQLRepository(),
	new GameResultMySQLRepository()
)

const registerTurnUseCase = new RegisterTurnUseCase(
	new TurnMySQLRepository(),
	new GameMySQLRepository(),
	new GameResultMySQLRepository()
)

interface TurnGetResponseBody {
	turnCount: number
	board: number[][]
	nextDisc: number | null
	winnerDisc: number | null
}

turnRouter.get(
	'/api/games/latest/turns/:turnCount',
	async (req, res: express.Response<TurnGetResponseBody>) => {
		const turnCount = parseInt(req.params.turnCount)

		const output = await findLatestGameTurnByTurnCount.run(turnCount)

		const responseBody = {
			turnCount: output.turnCount,
			board: output.board,
			nextDisc: output.nextDisc ?? null,
			winnerDisc: output.winnerDisc ?? null
		}

		res.json(responseBody)
	}
)

interface TurnPostRequestBody {
	turnCount: number
	move: {
		disc: number
		x: number
		y: number
	}
}

turnRouter.post(
	'/api/games/latest/turns',
	async (req: express.Request<{}, {}, TurnPostRequestBody>, res) => {
		const turnCount = req.body.turnCount
		const disc = req.body.move.disc
		const x = req.body.move.x
		const y = req.body.move.y

		await registerTurnUseCase.run(turnCount, toDisc(disc), new Point(x, y))

		res.status(201).end()
	}
)
