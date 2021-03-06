(function() {


module('Kifu');

test('ajax', 2, function() {
  stop(1000);
  var csa_file = 'test.csa';

  var source;
  jQuery.ajax({dataType: 'text', type: 'GET', url: csa_file,
    success: function(s) {
      source = s;
    }
  });

  Kifu.ajax({url: csa_file}, 'csa', function(kifu) {
    start();

    var info = kifu.info;
    same(info.format, 'csa', 'check format');
    same(info.source, source, 'source');
  });
});

test('boardPieceToPiece', 16, function() {
  same(Kifu.boardPieceToPiece('歩'), 'FU', '歩 -> FU');
  same(Kifu.boardPieceToPiece('香'), 'KY', '香 -> KY');
  same(Kifu.boardPieceToPiece('桂'), 'KE', '桂 -> KE');
  same(Kifu.boardPieceToPiece('銀'), 'GI', '銀 -> GI');
  same(Kifu.boardPieceToPiece('金'), 'KI', '金 -> KI');
  same(Kifu.boardPieceToPiece('角'), 'KA', '角 -> KA');
  same(Kifu.boardPieceToPiece('飛'), 'HI', '飛 -> HI');
  same(Kifu.boardPieceToPiece('王'), 'OU', '王 -> OU');
  same(Kifu.boardPieceToPiece('玉'), 'OU', '玉 -> OU');
  same(Kifu.boardPieceToPiece('と'), 'TO', 'と -> TO');
  same(Kifu.boardPieceToPiece('杏'), 'NY', '杏 -> NY');
  same(Kifu.boardPieceToPiece('圭'), 'NK', '圭 -> NK');
  same(Kifu.boardPieceToPiece('全'), 'NG', '全 -> NG');
  same(Kifu.boardPieceToPiece('馬'), 'UM', '馬 -> UM');
  same(Kifu.boardPieceToPiece('龍'), 'RY', '龍 -> RY');
  same(Kifu.boardPieceToPiece('竜'), 'RY', '竜 -> RY');
});

test('capitalize', 1, function() {
  var s = Kifu.capitalize('foo');
  same(s, 'Foo', 'capitalize');
});

test('clone', 6, function() {
  // simple object
  var h1 = {foo: 'foo'};
  var h2 = Kifu.clone(h1);
  same(h1, h2, 'same simple object');
  h2.foo = 'bar';
  QUnit.notDeepEqual(h1, h2, 'different simple object');

  // deep object
  h1 = {foo: 'foo', bar: {bar: 'bar', baz: null}};
  h2 = Kifu.clone(h1);
  same(h1, h2, 'same deep object');
  h2.bar.baz = 'baz';
  QUnit.notDeepEqual(h1, h2, 'different deep object');

  // simple array
  var a1 = [1, 2, null];
  var a2 = Kifu.clone(a1);
  same(a1, a2, 'same simple array');

  // deep array
  var a1 = [1, null, {foo: 'bar'}];
  var a2 = Kifu.clone(a1);
  same(a1, a2, 'same deep array');
});

test('directionToKanji', 3, function() {
  same(Kifu.directionToKanji('left'),        '左', 'left        -> 左');
  same(Kifu.directionToKanji('right'),       '右', 'right       -> 右');
  same(Kifu.directionToKanji('straight_up'), '直', 'straight_up -> 直');
});

test('integerToKanji', 11, function() {
  same(Kifu.integerToKanji(1),  '一',    '1 -> 一');
  same(Kifu.integerToKanji(2),  '二',    '2 -> 二');
  same(Kifu.integerToKanji(3),  '三',    '3 -> 三');
  same(Kifu.integerToKanji(4),  '四',    '4 -> 四');
  same(Kifu.integerToKanji(5),  '五',    '5 -> 五');
  same(Kifu.integerToKanji(6),  '六',    '6 -> 六');
  same(Kifu.integerToKanji(7),  '七',    '7 -> 七');
  same(Kifu.integerToKanji(8),  '八',    '8 -> 八');
  same(Kifu.integerToKanji(9),  '九',    '9 -> 九');
  same(Kifu.integerToKanji(10), '十',   '10 -> 十');
  same(Kifu.integerToKanji(11), '十一', '11 -> 十一');
});

test('integerToZenkaku', 10, function() {
  same(Kifu.integerToZenkaku(0),  '０', '0 -> ０');
  same(Kifu.integerToZenkaku(1),  '１', '1 -> １');
  same(Kifu.integerToZenkaku(2),  '２', '2 -> ２');
  same(Kifu.integerToZenkaku(3),  '３', '3 -> ３');
  same(Kifu.integerToZenkaku(4),  '４', '4 -> ４');
  same(Kifu.integerToZenkaku(5),  '５', '5 -> ５');
  same(Kifu.integerToZenkaku(6),  '６', '6 -> ６');
  same(Kifu.integerToZenkaku(7),  '７', '7 -> ７');
  same(Kifu.integerToZenkaku(8),  '８', '8 -> ８');
  same(Kifu.integerToZenkaku(9),  '９', '9 -> ９');
});

test('kanjiToDirection', 3, function() {
  same(Kifu.kanjiToDirection('左'), 'left',        '左 -> left');
  same(Kifu.kanjiToDirection('右'), 'right',       '右 -> right');
  same(Kifu.kanjiToDirection('直'), 'straight_up', '直 -> straight_up');
});

test('kanjiToMovement', 6, function() {
  same(Kifu.kanjiToMovement('上'), 'up',      '上 -> up');
  same(Kifu.kanjiToMovement('寄'), 'horizon', '寄 -> horizon');
  same(Kifu.kanjiToMovement('引'), 'down',    '引 -> down');
  same(Kifu.kanjiToMovement('下'), 'down',    '下 -> down');
  same(Kifu.kanjiToMovement('行'), 'up',      '行 -> up');
  same(Kifu.kanjiToMovement('入'), 'up',      '入 -> up');
});

test('kanjiToInteger', 11, function() {
  same(Kifu.kanjiToInteger('一'),    1, '一   ->  1');
  same(Kifu.kanjiToInteger('二'),    2, '二   ->  2');
  same(Kifu.kanjiToInteger('三'),    3, '三   ->  3');
  same(Kifu.kanjiToInteger('四'),    4, '四   ->  4');
  same(Kifu.kanjiToInteger('五'),    5, '五   ->  5');
  same(Kifu.kanjiToInteger('六'),    6, '六   ->  6');
  same(Kifu.kanjiToInteger('七'),    7, '七   ->  7');
  same(Kifu.kanjiToInteger('八'),    8, '八   ->  8');
  same(Kifu.kanjiToInteger('九'),    9, '九   ->  9');
  same(Kifu.kanjiToInteger('十'),   10, '十   -> 10');
  same(Kifu.kanjiToInteger('十一'), 11, '十一 -> 11');
});

test('load', 2, function() {
  var source = document.getElementById('csa1').innerHTML;
  same(Kifu.load('csa1'), source, 'load by id');
  same(Kifu.load('foo bar baz'), 'foo bar baz', 'load by string');
});

test('movementToKanji', 6, function() {
  same(Kifu.movementToKanji('up'),      '上', 'up      -> 上');
  same(Kifu.movementToKanji('horizon'), '寄', 'horizon -> 寄');
  same(Kifu.movementToKanji('down'),    '引', 'down    -> 引');
  same(Kifu.movementToKanji('down'),    '引', 'down    -> 引');
  same(Kifu.movementToKanji('up'),      '上', 'up      -> 上');
  same(Kifu.movementToKanji('up'),      '上', 'up      -> 上');
});

test('movePieceToPiece', 16, function() {
  same(Kifu.movePieceToPiece('歩'),   'FU', '歩   -> FU');
  same(Kifu.movePieceToPiece('香'),   'KY', '香   -> KY');
  same(Kifu.movePieceToPiece('桂'),   'KE', '桂   -> KE');
  same(Kifu.movePieceToPiece('銀'),   'GI', '銀   -> GI');
  same(Kifu.movePieceToPiece('金'),   'KI', '金   -> KI');
  same(Kifu.movePieceToPiece('角'),   'KA', '角   -> KA');
  same(Kifu.movePieceToPiece('飛'),   'HI', '飛   -> HI');
  same(Kifu.movePieceToPiece('王'),   'OU', '王   -> OU');
  same(Kifu.movePieceToPiece('玉'),   'OU', '玉   -> OU');
  same(Kifu.movePieceToPiece('と'),   'TO', 'と   -> TO');
  same(Kifu.movePieceToPiece('成香'), 'NY', '成香 -> NY');
  same(Kifu.movePieceToPiece('成桂'), 'NK', '成桂 -> NK');
  same(Kifu.movePieceToPiece('成銀'), 'NG', '成銀 -> NG');
  same(Kifu.movePieceToPiece('馬'),   'UM', '馬   -> UM');
  same(Kifu.movePieceToPiece('龍'),   'RY', '龍   -> RY');
  same(Kifu.movePieceToPiece('竜'),   'RY', '竜   -> RY');
});

test('noConflict', 2, function() {
  same(typeof Kifu, 'function');
  var k = Kifu.noConflict();
  same(typeof Kifu, 'undefined');
  Kifu = k;
});

test('pieceToBoardPiece', 14, function() {
  same(Kifu.pieceToBoardPiece('FU'), '歩', 'FU -> 歩');
  same(Kifu.pieceToBoardPiece('KY'), '香', 'KY -> 香');
  same(Kifu.pieceToBoardPiece('KE'), '桂', 'KE -> 桂');
  same(Kifu.pieceToBoardPiece('GI'), '銀', 'GI -> 銀');
  same(Kifu.pieceToBoardPiece('KI'), '金', 'KI -> 金');
  same(Kifu.pieceToBoardPiece('KA'), '角', 'KA -> 角');
  same(Kifu.pieceToBoardPiece('HI'), '飛', 'HI -> 飛');
  same(Kifu.pieceToBoardPiece('OU'), '王', 'OU -> 王');
  same(Kifu.pieceToBoardPiece('TO'), 'と', 'TO -> と');
  same(Kifu.pieceToBoardPiece('NY'), '杏', 'NY -> 杏');
  same(Kifu.pieceToBoardPiece('NK'), '圭', 'NK -> 圭');
  same(Kifu.pieceToBoardPiece('NG'), '全', 'NG -> 全');
  same(Kifu.pieceToBoardPiece('UM'), '馬', 'UM -> 馬');
  same(Kifu.pieceToBoardPiece('RY'), '龍', 'RY -> 龍');
});

test('pieceToMovePiece', 14, function() {
  same(Kifu.pieceToMovePiece('FU'), '歩',   'FU -> 歩');
  same(Kifu.pieceToMovePiece('KY'), '香',   'KY -> 香');
  same(Kifu.pieceToMovePiece('KE'), '桂',   'KE -> 桂');
  same(Kifu.pieceToMovePiece('GI'), '銀',   'GI -> 銀');
  same(Kifu.pieceToMovePiece('KI'), '金',   'KI -> 金');
  same(Kifu.pieceToMovePiece('KA'), '角',   'KA -> 角');
  same(Kifu.pieceToMovePiece('HI'), '飛',   'HI -> 飛');
  same(Kifu.pieceToMovePiece('OU'), '王',   'OU -> 王');
  same(Kifu.pieceToMovePiece('TO'), 'と',   'TO -> と');
  same(Kifu.pieceToMovePiece('NY'), '成香', 'NY -> 成香');
  same(Kifu.pieceToMovePiece('NK'), '成桂', 'NK -> 成桂');
  same(Kifu.pieceToMovePiece('NG'), '成銀', 'NG -> 成銀');
  same(Kifu.pieceToMovePiece('UM'), '馬',   'UM -> 馬');
  same(Kifu.pieceToMovePiece('RY'), '龍',   'RY -> 龍');
});

test('zenkakuToInteger', 10, function() {
  same(Kifu.zenkakuToInteger('０'),  0, '０ -> 0');
  same(Kifu.zenkakuToInteger('１'),  1, '１ -> 1');
  same(Kifu.zenkakuToInteger('２'),  2, '２ -> 2');
  same(Kifu.zenkakuToInteger('３'),  3, '３ -> 3');
  same(Kifu.zenkakuToInteger('４'),  4, '４ -> 4');
  same(Kifu.zenkakuToInteger('５'),  5, '５ -> 5');
  same(Kifu.zenkakuToInteger('６'),  6, '６ -> 6');
  same(Kifu.zenkakuToInteger('７'),  7, '７ -> 7');
  same(Kifu.zenkakuToInteger('８'),  8, '８ -> 8');
  same(Kifu.zenkakuToInteger('９'),  9, '９ -> 9');
});

test('initialization', 9, function() {
  // simple initialization
  var kifu = Kifu();
  var info = {};
  same(kifu.suite_init, Kifu.Suite(), 'simple suite_init');
  same(kifu.info,       info,         'simple info');
  same(kifu.moves,      Kifu.Move(),  'simple moves');

  // initialization with source
  var source = 'V2.2';
  info.source = source;
  var kifu = Kifu(source);
  same(kifu.suite_init, Kifu.Suite(), 'source suite_init');
  same(kifu.info,       info,         'source info');
  same(kifu.moves,      Kifu.Move(),  'source moves');

  // initialization with source and format
  info.format       = 'csa';
  info.player_start = 'black';
  info.version      = '2.2';
  var kifu = Kifu(source, 'csa');
  same(kifu.suite_init, Kifu.Suite(), 'source suite_init');
  same(kifu.info,       info,         'source info');
  same(kifu.moves,      Kifu.Move(),  'source moves');
});

test('hasNext, hasPrev, moveCurrent, moveFirst, moveLast, moveNext, movePrev, moveTo', 49, function() {
  var kifu = Kifu("V2.2\nPI\n+2726FU\n-3334FU");
  kifu.parse('csa');

  var moves = kifu.moves.clone();
  var suite = kifu.suite.clone();

  // 1st move
  suite.move(moves.get(1));
  same(kifu.hasNext(),     true,         '1st move hasNext');
  same(kifu.hasPrev(),     false,        '1st move hasPrev');
  same(kifu.moveCurrent(), null,         '1st move current');
  same(kifu.moveNext(),    moves.get(1), '1st move next');
  same(kifu.is_black,      false,        '1st is_black');
  same(kifu.step,          1,            '1st step');
  same(kifu.suite,         suite,        '1st suite');

  // 2nd move
  suite.move(moves.get(2));
  same(kifu.hasNext(),     true,         '2nd move hasNext');
  same(kifu.hasPrev(),     false,        '2nd move hasPrev');
  same(kifu.moveCurrent(), moves.get(1), '2nd move current');
  same(kifu.moveNext(),    moves.get(2), '2nd move next');
  same(kifu.is_black,      true,         '2nd is_black');
  same(kifu.step,          2,            '2nd step');
  same(kifu.suite,         suite,        '2nd suite');

  // 3rd move
  same(moves.get(3),       undefined,    '3rd move undefined');
  same(kifu.hasNext(),     false,        '3rd move hasNext');
  same(kifu.hasPrev(),     true,         '3rd move hasPrev');
  same(kifu.moveCurrent(), moves.get(2), '3rd move current');
  same(kifu.moveNext(),    undefined,    '3rd move next');
  same(kifu.is_black,      true,         '3rd is_black');
  same(kifu.step,          2,            '3rd step');
  same(kifu.suite,         suite,        '3rd suite');

  // 2nd prev
  suite.moveReverse(moves.get(2));
  same(kifu.movePrev(),    moves.get(2), '2nd move prev');
  same(kifu.is_black,      false,        '2nd is_black');
  same(kifu.step,          1,            '2nd step');
  same(kifu.suite,         suite,        '2nd suite');

  // 1st prev
  suite.moveReverse(moves.get(1));
  same(kifu.hasNext(),     true,         '1st move hasNext');
  same(kifu.hasPrev(),     false,        '1st move hasPrev');
  same(kifu.moveCurrent(), moves.get(1), '1st move current');
  same(kifu.movePrev(),    moves.get(1), '1st move prev');
  same(kifu.is_black,      true,         '1st is_black');
  same(kifu.step,          0,            '1st step');
  same(kifu.suite,         suite,        '1st suite');

  // init prev
  same(kifu.hasNext(),     true,         'init move hasNext');
  same(kifu.hasPrev(),     false,        'init move hasPrev');
  same(kifu.moveCurrent(), null,         'init move current');
  same(kifu.movePrev(),    moves.get(0), 'init prev move');
  same(kifu.is_black,      true,         'init prev black');
  same(kifu.step,          0,            'init prev step');
  same(kifu.suite,         suite,        'init prev suite');

  // move last
  suite.move(moves.get(1));
  suite.move(moves.get(2));
  kifu.moveLast();
  same(kifu.is_black, true,  'last is_black');
  same(kifu.step,     2,     'last step');
  same(kifu.suite,    suite, 'last suite');

  // move first
  suite.moveReverse(moves.get(2));
  suite.moveReverse(moves.get(1));
  kifu.moveFirst();
  same(kifu.is_black, true,  'first is_black');
  same(kifu.step,     0,     'first step');
  same(kifu.suite,    suite, 'first suite');

  // move to
  suite.move(moves.get(1));
  kifu.moveTo(1);
  same(kifu.is_black, false, 'move to 1 is_black');
  same(kifu.step,     1,     'move to 1 step');
  same(kifu.suite,    suite, 'move to 1 suite');
});

test('moveStrings', 1, function() {
  var kifu = Kifu("V2.2\nPI\n+2726FU\n-3334FU");
  kifu.parse('csa');

  same(kifu.moveStrings(), ['２六歩', '３四歩'], 'move strings');
});

test('parse', 7, function() {
  var info  = {
    format: 'csa', player_start: 'black', source: 'V2.2', version: '2.2'};
  var kifu  = Kifu('V2.2');
  var moves = Kifu.Move();
  var suite = Kifu.Suite();
  ok(kifu.parse('csa'), 'parse');
  same(kifu.is_black,   true,  'is_black');
  same(kifu.info,       info,  'info');
  same(kifu.moves,      moves, 'moves');
  same(kifu.step,       0,     'step');
  same(kifu.suite,      suite, 'suite');
  same(kifu.suite_init, suite, 'suite_init');
});

test('source', 5, function() {
  var kifu = Kifu();

  same(kifu.source(), undefined, 'first status');

  // string
  var source = 'V2.2';
  same(kifu.source(source), source, source);
  same(kifu.source(), source, source);

  // document id
  var source = document.getElementById('csa1').innerHTML;
  same(kifu.source('csa1'), source, source);
  same(kifu.source(), source, source);
});


})();

/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
