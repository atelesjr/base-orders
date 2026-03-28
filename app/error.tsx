'use client';

import Button from '../components/ui/buttons/Button';

type GlobalErrorProps = {
	error: Error;
	reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
	return (
		<html>
			<body
				style={{
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					background: '#fff',
					padding: '2rem',
				}}
			>
				<h2
					style={{
						fontSize: '2rem',
						fontWeight: 700,
						marginBottom: '1rem',
						color: '#222',
						textAlign: 'center',
					}}
				>
					Ocorreu um erro inesperado
				</h2>
				<p
					role="alert"
					aria-live="assertive"
					style={{
						fontSize: '1.1rem',
						color: '#444',
						marginBottom: '2rem',
						textAlign: 'center',
						maxWidth: 400,
					}}
				>
					{error.message || 'Algo deu errado. Por favor, tente novamente.'}
				</p>
				<Button variant="primary" size="md" width="auto" onClick={reset}>
					Tentar novamente
				</Button>
			</body>
		</html>
	);
}
