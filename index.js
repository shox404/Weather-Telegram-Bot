const { default: axios } = require("axios");
const { Telegraf } = require("telegraf");

const data = {
	id: "6289237257",
	token: "6289237257:AAEuo7VqUlokUVgRHLDmKYzqcY1OQgblrxw",
};

const bot = new Telegraf(data.token);

bot.start((ctx) => {
	ctx.reply("Hello my friend !");
});

bot.on("text", (ctx) => {
	const APIkey = "bcf2048bc3be154bded8f277f580ba2e";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ctx.update.message.text}&units=metric&appid=${APIkey}`;

	let icon = "";

	function getIcon(data) {
		if (data === "Clouds") icon = "☁";
		if (data === "Haze") icon = "🌫";
		if (data === "Rain") icon = "🌧";
		if (data === "Clear") icon = "🌤";
		if (data === "Drizzle") icon = "⛈";
		if (data === "Snow") icon = "❄";
		if (data === "Thunderstorm") icon = "🌪";
	}

	axios.get(url).then((res) => {
		getIcon(res.data.weather[0].main)
		if (icon !== "") ctx.reply(res.data.main.temp + " ℃ " + icon);
	}).catch(() => {
		ctx.reply("There is no such thing")
	});
});

bot.launch();
