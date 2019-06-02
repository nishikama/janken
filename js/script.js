'use strict'

$(() => {

    // 定数定義
    // 汎用定数
    const myself = { index: null, score: 0, hand: null }
    const enemy = { index: null, score: 0, hand: null }

    // ヤクザたち
    const fighters = [
        { name: '広能昌三' },
        { name: '坂井鉄也' },
        { name: '山守義雄' },
        { name: '若杉寛' },
        { name: '上田透' },
        { name: '有田俊雄' },
        { name: '武田明' },
        { name: '山中正治' },
        { name: '槙原政吉' }
    ]

    // 名ゼリフリスト
    const wordsSeed = [
        '神輿が勝手に歩けるいうんなら歩いてみないや、おう！',
        '馬の小便、いうなら、ホンマもんの小便飲ましたろうか',
        '狙われるモンより、狙うモンのほうが強いんじゃ',
        'そがな考えしとるとスキができるぞ',
        '調子に乗りゃがって、ええ加減にせえよ、ゼニになりもせんことしやがって',
        'あんたらもメシ喰えんようなカラダになってもらいますけん',
        'ワシを生かしとったらオドレら後で一匹ずつブチ殺してくれちゃるんど',
        '知らん仏より知っとる鬼の方がマシじゃけの',
        '殺るんなら、今ここで殺りないや、能書きは要らんよ',
        '広島の喧嘩いうたら、とるかとられるかで',
        '広島極道はイモかもしれんが、旅の風下に立ったことはいっぺんもないんで',
        '枯れ木に山が食い潰されるわい',
        'ケンカ相手に金貸す馬鹿がどこにおる、このボケ',
        'あんたそれでも極道か、それとも何かそのへんのタクシー屋のおっちゃんか、どっちや',
        'おんどれらも吐いたツバ、呑まんとけよ',
        'ワシゃ、ワレの命もらうも、虫歯抜くんも同じことなんで',
        'お前ら、そこらの店、ササラモサラにしちゃれぃ'
    ]

    // グー、チョキ、パー
    const hand = [1, 2, 3]

    // 関数定義
    // オープニング動画
    const opening = () => {
        const openingView = (`
            <div id="wrap">
                <div id="opening">
                    <h1><img src="./images/opening.png" alt="仁義なき戦い"></h1>
                    <h2 id="plate"><img src="./images/plate.svg" alt="ジャンケン死闘編"></h2>
                    ${new Array(9).fill(null).map((_, i) => '<p id="blood0' + (i + 1) + '"><img src="./images/blood0' + (i + 1) + '.svg" alt=""></p>').join('')}
                </div>
            </div>
        `)
        rootElement.html(openingView)
        new TimelineMax()
            .to('#opening', 3.0, { opacity: 1.0, delay: 1.0 })
            .to('#plate', 1.5, { rotation: -6, scale: 1.0, opacity: 1.0 }, '-=1.5')
            .set('#blood01', { opacity: 1.0, delay: 0.45 })
            .set('#blood02', { opacity: 1.0, delay: 0.40 })
            .set('#blood03', { opacity: 1.0, delay: 0.35 })
            .set('#blood04', { opacity: 1.0, delay: 0.30 })
            .set('#blood05', { opacity: 1.0, delay: 0.25 })
            .set('#blood06', { opacity: 1.0, delay: 0.20 })
            .set('#blood07', { opacity: 1.0, delay: 0.15 })
            .set('#blood08', { opacity: 1.0, delay: 0.10 })
            .set('#blood09', { opacity: 1.0, delay: 0.05 })
            .to('#opening', 1.0, { opacity: 0, onComplete: myselfSelect })
    }

    // プレーヤーの選択
    const myselfSelect = () => {
        const selectView = (`
            <div id="wrap" class="selector">
                <div class="outer">
                    <ul class="main">
                        ${[...fighters].map((_, i) => '<li class="fighter" style="background-image: url(./images/fighter0' + (i + 1) + '.jpg);"><p id="fighter0' + (i + 1) + '"></p></li>').join('')}
                    </ul>
                    <div class="cover close"></div>
                </div>
                <div id="modal">
                    おんどりゃ、誰じゃっ！
                </div>
            </div>
        `)
        rootElement.html(selectView)
            .on({
                mouseenter: (e) => {
                    $(e.target).css('borderColor', '#f42f5d')
                },
                mouseleave: (e) => {
                    $(e.target).css('borderColor', '#ffffff')
                },
                click: (e) => {
                    myself.index = parseInt($(e.target).attr('id').substr(-1, 2))
                    new TimelineMax()
                        .to(e.target, 0.1, { css: { borderColor: '#ffffff' }, repeat: 9, yoyo: true, onStart: function () { $('.cover').removeClass('close') } })
                        .to('.outer', 1, { opacity: 0, onComplete: enemySelect })
                }
            }, 'p')
            .on({
                click: (e) => {
                    TweenMax.to(e.target, 0.5, { opacity: 0, onComplete: function () { $(e.target).addClass('close') } })
                }
            }, '#modal')
        $(window).trigger('resize')
        TweenMax.to('.outer, #modal', 1.0, { opacity: 1.0 })
    }

    // 相手の選択
    const enemySelect = () => {
        $('.main p').css('borderColor', '#ffffff');
        $('.cover').addClass('close')
        rootElement
            .off('mouseenter click')
            .on({
                mouseenter: (e) => {
                    $(e.target).css('borderColor', '#2338d9')
                },
                click: (e) => {
                    enemy.index = parseInt($(e.target).attr('id').substr(-1, 2))
                    new TimelineMax()
                        .to($(e.target), 0.1, { css: { borderColor: '#ffffff' }, repeat: 9, yoyo: true, onStart: function () { $('.cover').removeClass('close') } })
                        .to('.outer', 1, { opacity: 0, onComplete: setting })
                }
            }, 'p')
            .on({
                click: (e) => {
                    TweenMax.to($(e.target), 0.5, { opacity: 0, onComplete: function () { $('#modal').remove() } })
                }
            }, '#modal')
        $('#modal')
            .removeClass('close')
            .html('ワシか？ ワシは…')
        TweenMax.to('.outer, #modal', 1.0, { opacity: 1.0 })
    }

    // ゲーム開始前の設定
    const setting = () => {
        const settingView = (`
            <div id="wrap" class="fight">
                <div class="outer">
                    <div class="main">
                        <div id="fighter">
                            <div class="myself">
                                <div class="icon-outer" style="background-image: url(./images/fighter0${myself.index}.jpg);"><p class="icon-inner"></p></div>
                                <p>${fighters[myself.index - 1].name}</p>
                            </div>
                            <div class="enemy">
                                <div class="icon-outer" style="background-image: url(./images/fighter0${enemy.index}.jpg);"><p class="icon-inner"></p></div>
                                <p>${fighters[enemy.index - 1].name}</p>
                            </div>
                        </div>
                        <div id="words"></div>
                        <div id="gun">
                            <ul class="myself"></ul>
                            <ul class="enemy"></ul>
                        </div>     
                        <div id="hand"></div>
                    </div>
                </div>
                <div id="modal"> 
                    <div class="main">
                        <p>ワレの弾はなんじゃ？</p>
                        <ul>
                            ${new Array(3).fill(null).map((_, i) => '<li><img src="./images/hand0' + (i + 1) + '.png" id="hand0' + (i + 1) + '"></li>').join('')}
                        </ul>
                    </div>
                </div>
                <div class="cover close"></div>
            </div>
        `)
        rootElement.html(settingView)
            .off('mouseenter mouseleave click')
            .on('click', 'img', (e) => {
                myself.select = parseInt($(e.target).attr('id').substr(-1, 2))
                TweenMax.to($(e.target), 0.5, { opacity: 0, repeat: 5, yoyo: true, onStart: function () { $('.cover').removeClass('close') }, onComplete: fight })
            })
        handSelect()
    }

    // グー、チョキ、パーの選択
    const handSelect = () => {
        if (!words.length) words = wordsSeed
        $('#modal').removeClass('close');
        $('.cover').addClass('close');
        TweenMax.to('#modal, .cover', 1.0, { opacity: 1.0 })
        $('#words, #hand').empty()
    }

    // ジャンケン実行
    const fight = () => {
        TweenMax.to('#modal', 0.5, { opacity: 0, onComplete: function () { $('#modal').addClass('close') } })
        $('#hand').html('<p>ほんじゃぁ、勝負じゃ！</p>')
        setTimeout(() => {
            $('#hand p').html('ジャン')
            setTimeout(() => {
                $('#hand p').html('ケン')
                setTimeout(() => {
                    $('#hand p').html('ポン！')
                    setTimeout(judge, 1000)
                }, 1000)
            }, 1000)
        }, 2000)
    }

    // 勝敗判定
    const judge = () => {
        const selectedHand = shuffle(hand)
        enemy.select = selectedHand[0]
        let result = 0
        if (myself.select === 1) {
            if (enemy.select === 2) {
                myself.score++
                result = 1
            }
            else if (enemy.select === 3) {
                enemy.score++
                result = 2
            }
        }
        else if (myself.select === 2) {
            if (enemy.select === 1) {
                enemy.score++
                result = 2
            }
            else if (enemy.select === 3) {
                myself.score++
                result = 1
            }
        }
        else if (myself.select === 3) {
            if (enemy.select === 1) {
                myself.score++
                result = 1
            }
            else if (enemy.select === 2) {
                enemy.score++
                result = 2
            }
        }
        $('#hand').html('<img class="myself" src="./images/hand0' + myself.select + '.png"><img class="enemy" src="./images/hand0' + enemy.select + '.png">')
        const judgeView = (winner, color) => {
            return $(`
                <div class="main" style="background-image: url(./images/fighter0${winner}.jpg);">
                    <p class="image-inner" style="border-color: ${color};"></p>
                </div>
                <p class="finish">ワシの… ワシの勝ちじゃ…</p>
            `)
        }
        if (result === 1) {
            $('#gun .myself').append('<li>')
            $('#words').html(words.pop())
            if (myself.score < 3) {
                $('#modal').addClass('close')
                setTimeout(handSelect, 5000)
            }
            else {
                $('#modal').html(judgeView(myself.index, '#f42f5d'))
                    .addClass('last')
                    .removeClass('close');
                TweenMax.to('#modal', 1.0, { opacity: 1.0 })
            }
        }
        else if (result === 2) {
            $('#gun .enemy').append('<li>')
            $('#words').html(words.pop())
            if (enemy.score < 3) {
                $('#modal').addClass('close')
                setTimeout(handSelect, 5000)
            }
            else {
                $('#modal').html(judgeView(enemy.index, '#2338d9'))
                    .addClass('last')
                    .removeClass('close');
                TweenMax.to('#modal', 1.0, { opacity: 1.0 })
            }
        }
        else {
            $('#words').html('あいこじゃ、命拾いしたのう')
            setTimeout(handSelect, 3000)
        }
    }

    // 乱数生成
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let r = Math.floor(Math.random() * (i + 1))
            let tmp = array[i]
            array[i] = array[r]
            array[r] = tmp
        }
        return array
    }
    let words = shuffle(wordsSeed)

    // リサイズ対応
    $(window).on('resize', () => {
        const $width = $(window).width() < 900 ? $(window).width() : 900
        const $height = $(window).height() < 900 ? $(window).height() : 900
        if ($width / $height > 1) {
            $('#container, .outer').css('width', $height + 'px')
            $('.outer').css('paddingTop', $height + 'px')
        } else {
            $('#container, .outer').css('width', $width + 'px')
            $('.outer').css('paddingTop', $width + 'px')
        }
    })

    const rootElement = $('#container')

    // ゲーム開始
    opening()
})