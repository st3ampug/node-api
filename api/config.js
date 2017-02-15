const config = {
    region: "eu-west-1",
    endpoint: "https://dynamodb.eu-west-1.amazonaws.com",
    devicesTableName: "WaracleDevices",
    usersTableName: "WaracleUsers",
    logTableName: "WaracleLogs",
    secret: "waracle2017"
}

module.exports = config;

// 100 random numbers
/*
// var hue = Math.floor(Math.random() * 360);
// var pastel = 'hsl(' + hue + ', 100%, 87.5%)';
// $('div').css('background-color', pastel);

63
292
34
358
170
352
317
312
60
258
176
181
19
306
55
55
96
263
55
195
206
153
83
81
220
273
20
336
159
338
56
26
155
343
201
190
34
182
331
175
234
247
359
236
181
292
284
247
163
205
109
191
110
204
219
267
10
261
123
203
102
194
256
330
132
40
280
21
120
50
81
297
328
99
186
90
169
266
101
25
314
34
282
42
274
321
201
246
116
35
309
62
114
112
179
8
232
211
260
218

*/