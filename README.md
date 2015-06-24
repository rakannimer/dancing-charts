# Dancing Charts

Animated Google Charts with React.

## Usage

The Component reads the state of the chart from a Google Spreadsheet. An example one is provided, but you can change it from the user interface.

The SpreadSheet should have 2 sheets :

	1- Data

		The first row should contain the columns in String format
		And each following row represents a state of the graph at a given frame

	2- Options
		The first row should contain the columns in String format
		The second the color of each.



## Demo & Examples

Live demo: [RakanNimer.github.io/dancing-charts](http://RakanNimer.github.io/dancing-charts/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

## Development

Fork the repo and clone it.
```
npm install
```
To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## Credits

[tabletop](https://github.com/jsoma/tabletop) to grab the Chart data from Google Spreadsheets.
[Bouncing css Loader](http://codepen.io/dicson/pen/vOxZjM)
[React Component Generator](https://github.com/JedWatson/generator-react-component)

