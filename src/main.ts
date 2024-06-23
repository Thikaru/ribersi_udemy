import express from 'express'
import morgan from 'morgan'
import 'express-async-errors'
import { gameRouter } from './presentation/gameRouter';
import { turnRouter } from './presentation/turnRouter';
import { DomainError } from './domain/error/domainError';
import { ApplicationError } from './application/error/applicationError';

const PORT = 3000;
const app = express();

// 開発環境で見やすいログを出す
app.use(morgan('dev'));
app.use(express.static('static', { extensions: ['html'] }));
app.use(express.json());

// Router
app.use(gameRouter);
app.use(turnRouter);

// Error管理
app.use(errorHandler);

// PORT番号へのアクセスがあるかどうかを判定
app.listen(PORT, () => {
	console.log(`Reversi application started: http://localhost:${PORT}`);
});

function errorHandler(err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) {
	if (err instanceof DomainError) {
		res.status(400).json({
			type: err.type,
			message: err.message
		});
		return;
	}

	if (err instanceof ApplicationError) {
		switch (err.type) {
			case 'LatestGameNotFound':
				res.status(404).json({
					type: err.type,
					message: err.message
				});
				return;
		}
	}

	console.error('Unexpected error occurred', err);
	res.status(500).send({
		message: 'Unexpected error occurred'
	});
}