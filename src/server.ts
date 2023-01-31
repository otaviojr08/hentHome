import { App }  from './app/App'

const app = new App().express

const PORT = 8080

app.listen(PORT)

console.log(`Server started on port ${PORT}`);
