Function.prototype.member = function(name, value){
	this.prototype[name] = value
}

function sleep (delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
 }
 

function calc(money, icon1, icon2, icon3, icon4)
{
	var temp = money
   var chun = temp / 1000
   temp = temp - (chun * 1000)
   var baek = temp / 100
   temp = temp - (baek * 100)
   var sip = temp / 10
   temp = temp - (sip * 10)
   var il = temp

   var firstnum = String(chun)
   var secondnum = String(baek)
   var thirdnum = String(sip)
   var fourthnum = String(il)
   var text1 = ".png"

   icon1.setSprite(firstnum.concat(text1))
   icon2.setSprite(secondnum.concat(text1))
   icon3.setSprite(thirdnum.concat(text1))
   icon4.setSprite(fourthnum.concat(text1))
}

//////// Game Definition
function Game(){}
Game.start = function(room, welcome){
	game.start(room.id)
	printMessage(welcome)
}
Game.end = function(){
	game.clear()
}
Game.move = function(room){
	game.move(room.id)	
}
Game.handItem = function(){
	return game.getHandItem()
}


//////// Room Definition

function Room(name, background){
	this.name = name
	this.background = background
	this.id = game.createRoom(name, background)
}
Room.member('setRoomLight', function(intensity){
	this.id.setRoomLight(intensity)
})

//////// Object Definition

function Object(room, name, image){
	this.room = room
	this.name = name
	this.image = image

	if (room !== undefined){
		this.id = room.id.createObject(name, image)
	}
}
Object.STATUS = { OPENED: 0, CLOSED: 1, LOCKED: 2 }

Object.member('setSprite', function(image){
	this.image = image
	this.id.setSprite(image)
})
Object.member('resize', function(width){
	this.id.setWidth(width)
})
Object.member('setDescription', function(description){
	this.id.setItemDescription(description)
})

Object.member('getX', function(){
	return this.id.getX()
})
Object.member('getY', function(){
	return this.id.getY()
})
Object.member('locate', function(x, y){
	this.room.id.locateObject(this.id, x, y)
})
Object.member('move', function(x, y){
	this.id.moveX(x)
	this.id.moveY(y)
})

Object.member('show', function(){
	this.id.show()
})
Object.member('hide', function(){
	this.id.hide()
})
Object.member('open', function(){
	this.id.open()
})
Object.member('close', function(){
	this.id.close()
})
Object.member('lock', function(){
	this.id.lock()
})
Object.member('unlock', function(){
	this.id.unlock()
})
Object.member('isOpened', function(){
	return this.id.isOpened()
})
Object.member('isClosed', function(){
	return this.id.isClosed()
})
Object.member('isLocked', function(){
	return this.id.isLocked()
})
Object.member('pick', function(){
	this.id.pick()
})
Object.member('isPicked', function(){
	return this.id.isPicked()
})

Object.member('this', function(){
	return this.id
 })

//////// Door Definition

function Door(room, name, closedImage, openedImage, connectedTo){
	Object.call(this, room, name, closedImage)

	// Door properties
	this.closedImage = closedImage
	this.openedImage = openedImage
	this.connectedTo = connectedTo
}
// inherited from Object
Door.prototype = new Object()

Door.member('onClick', function(){
	if (!this.id.isLocked() && this.id.isClosed()){
		this.id.open()
	}
	else if (this.id.isOpened()){
		if (this.connectedTo !== undefined){
			Game.move(this.connectedTo)
		}
		else {
			Game.end()
		}
	}
})
Door.member('onOpen', function(){
	this.id.setSprite(this.openedImage)
})
Door.member('onClose', function(){
	this.id.setSprite(this.closedImage)
})


//////// Keypad Definition

function Keypad(room, name, image, password, callback){
	Object.call(this, room, name, image)

	// Keypad properties
	this.password = password
	this.callback = callback
}
// inherited from Object
Keypad.prototype = new Object()

Keypad.member('onClick', function(){
	showKeypad('number', this.password, this.callback)
})


//////// DoorLock Definition
function DoorLock(room, name, image, password, door, message){
	Keypad.call(this, room, name, image, password, function(){
		printMessage(message)
		door.unlock()
	})
}
// inherited from Object
DoorLock.prototype = new Keypad()

/////// Item Definition

function Item(room, name, image){
	Object.call(this, room, name, image)
}
// inherited from Object
Item.prototype = new Object()

Item.member('onClick', function(){
	this.id.pick()
})
Item.member('isHanded', function(){
	return Game.handItem() == this.id
})

Item.member('this', function(){
	return this.id
 })


 /// buy BuyItem Definition
 function BuyItem(room, name, image, price){
	Object.call(this, room, name, image)
	
}
// inherited from Object
BuyItem.prototype = new Object()

BuyItem.member('onClick', function(){
	this.id.pick()
	money = money - price
	calc(money, roompx.num1, roompx.num2, roompx.num3, roompx.num4)
	printMessage("hi")
})
BuyItem.member('isHanded', function(){
	return Game.handItem() == this.id
})

BuyItem.member('this', function(){
	return this.id
 })

playSound("frontline.wav") // 멸공의 횃불 재생

room0 = new Room('room0', 'room0.png')
room1 = new Room('room1', 'room1.png')		// 변수명과 이름이 일치해야 한다.
room2 = new Room('room2', 'room2.png')		
room3 = new Room('room3', 'room3.png')		
room4 = new Room('room4', 'room4.png')		
room5 = new Room('room5', 'room5.png')
roompx = new Room('roompx','roompx.png')

//----------------------------------room0------------------------------------------//

room0.arrow1 = new Object(room0, 'arrow1','arrow1.png')
room0.arrow1.resize(150)
room0.arrow1.locate(240,470)

room0.arrow2 = new Object(room0, 'arrow2','arrow2.png')
room0.arrow2.resize(150)
room0.arrow2.locate(460,470)

room0.arrow3 = new Object(room0, 'arrow3','arrow3.png')
room0.arrow3.resize(150)
room0.arrow3.locate(770,470)

room0.arrow4 = new Object(room0, 'arrow4','arrow4.png')
room0.arrow4.resize(150)
room0.arrow4.locate(1020,470)

room0.arrow4.onClick = function(){
	this.connectedTo = roompx
	Game.move(this.connectedTo)
	roompx.cookedsunel.hide()
	roompx.cookedgome.hide()
	roompx.cookedcombination.hide()
	roompx.cookedcrispy.hide()
}

room0.jogyo = new Object(room0, 'jogyo', 'jogyo.png')
room0.jogyo.resize(300)
room0.jogyo.locate(640,300)

room0.jogyo.onClick = function(){
	if (!roompx.chickenpizza.isHanded()){
		printMessage("내가 제일 좋아하는건 슈넬치킨과 콤비네이션 피자다")
	}
	else {printMessage("냠냠")}
}
//----------------------------------px------------------------------------------//
//sunelcooked = 0
//combinationcooked = 0
//gomecooked = 0
//crispycooked = 0
//soundcheck = 0
cookingcomplete = 0
//cookedgome.hide()
//cookedcombination.hide()

//cookedcrispy.hide()
var money = 9999
roompx.num1 = new Object(roompx, 'num1' ,'9.png')
roompx.num1.resize(50)
roompx.num1.locate(950,600)
roompx.num2 = new Object(roompx, 'num2' ,'9.png')
roompx.num2.resize(50)
roompx.num2.locate(1000,600)
roompx.num3 = new Object(roompx, 'num3' ,'9.png')
roompx.num3.resize(50)
roompx.num3.locate(1050,600)
roompx.num4 = new Object(roompx, 'num4' ,'9.png')
roompx.num4.resize(50)
roompx.num4.locate(1100,600)

roompx.microwave = new Object(roompx, 'microwave', 'microwave(closed).png')
roompx.microwave.resize(280)
roompx.microwave.locate(140,180)
roompx.redbutton = new Object(roompx, 'redbutton', 'redbutton.png')
roompx.redbutton.resize(20)
roompx.redbutton.locate(267,220)

roompx.microwave.close()
roompx.microwave.onOpen = function() { 
	roompx.microwave.setSprite('microwave(open).png') 
}

roompx.cookedsunel = new Item(roompx, 'cookedsunel','cookedsunel.png')
roompx.cookedsunel.resize(70)
roompx.cookedsunel.locate(210,210)

roompx.cookedcombination = new Item(roompx, 'cookedcombination','cookedcombination.png')
roompx.cookedcombination.resize(70)
roompx.cookedcombination.locate(210,210)

roompx.cookedcrispy = new Item(roompx, 'cookedcrispy','cookedcrispy.png')
roompx.cookedcrispy.resize(70)
roompx.cookedcrispy.locate(210,210)

roompx.cookedgome = new Item(roompx, 'cookedgome','cookedgome.png')
roompx.cookedgome.resize(70)
roompx.cookedgome.locate(210,210)

roompx.chickenpizza = new Object(roompx, 'chickenpizza', 'chickenpizza.png')
roompx.chickenpizza.resize(0)
roompx.cookedcrispy.locate(210,210)

roompx.microwave.onClick = function(){
	if (roompx.microwave.isOpened() && (roompx.sunel1.isHanded() || roompx.crispy1.isHanded() || roompx.combination1.isHanded() || roompx.gome1.isHanded()) ){
		roompx.microwave.close()
		roompx.microwave.setSprite('microwave(closed).png')
		printMessage("5초의 조리시간이 필요합니다! 버튼을 누르세요")
	}
	else if (roompx.microwave.isOpened() && !(roompx.sunel1.isHanded() || roompx.crispy1.isHanded() || roompx.combination1.isHanded() || roompx.gome1.isHanded())){
		roompx.microwave.close()
		roompx.microwave.setSprite('microwave(closed).png')
	}
	else if (roompx.microwave.isClosed() && cookingcomplete == 0){
		roompx.microwave.open()
	}
	else if (roompx.microwave.isClosed() && cookingcomplete == 1){
		roompx.microwave.open()
		if (roompx.sunel1.isHanded()){
			roompx.cookedsunel.show()
			cookingcomplete = 0
		}
		else if(roompx.crispy1.isHanded()){
			roompx.cookedcrispy.show()
			cookingcomplete = 0
		}
		else if (roompx.gome1.isHanded()){
			roompx.cookedgome.show()
			cookingcomplete = 0
		}
		else if(roompx.combination1.isHanded()){
			roompx.cookedcombination.show()
			cookingcomplete = 0
		}
	}
	else {
		roompx.microwave.open()
	}
}

roompx.redbutton.onClick = function(){
	if (roompx.microwave.isClosed() && (roompx.sunel1.isHanded() || roompx.crispy1.isHanded() || roompx.combination1.isHanded() || roompx.gome1.isHanded())){
	sleep(5000)
	cookingcomplete = 1
	printMessage("조리가 완료되었습니다")
	}
	else {printMessage("내용물을 넣어주세요")}
}

game.makeCombination(roompx.cookedsunel.this(), roompx.cookedcombination.this(), roompx.chickenpizza.this())

roompx.sunel1 = new BuyItem(roompx, 'sunel1','sunel.png', 2470)
roompx.sunel1.resize(110)
roompx.sunel1.locate(500,320)

roompx.sunel2 = new Object(roompx, 'sunel2','sunel.png')
roompx.sunel2.resize(110)
roompx.sunel2.locate(620,330)

roompx.sunel3 = new Object(roompx, 'sunel3','sunel.png')
roompx.sunel3.resize(110)
roompx.sunel3.locate(740,340)

roompx.gome1 = new BuyItem(roompx, 'gome1','gome.png', 3430)
roompx.gome1.resize(120)
roompx.gome1.locate(860,195)

roompx.gome2 = new Object(roompx, 'gome2','gome.png')
roompx.gome2.resize(120)
roompx.gome2.locate(980,200)

roompx.gome3 = new Object(roompx, 'gome3','gome.png')
roompx.gome3.resize(120)
roompx.gome3.locate(1100,205)

roompx.combination1 = new BuyItem(roompx, 'combination1','combination.png', 2100)
roompx.combination1.resize(110)
roompx.combination1.locate(500,200)

roompx.combination2 = new Object(roompx, 'combination2','combination.png')
roompx.combination2.resize(110)
roompx.combination2.locate(620,202)

roompx.combination3 = new Object(roompx, 'combination3','combination.png')
roompx.combination3.resize(110)
roompx.combination3.locate(740,205)

roompx.crispy1 = new BuyItem(roompx, 'crispy1','crispy.png', 1700)
roompx.crispy1.resize(105)
roompx.crispy1.locate(860,343)

roompx.crispy2 = new Object(roompx, 'crispy2','crispy.png')
roompx.crispy2.resize(110)
roompx.crispy2.locate(980,350)

roompx.crispy3 = new Object(roompx, 'crispy3','crispy.png')
roompx.crispy3.resize(110)
roompx.crispy3.locate(1100,360)


//----------------------------------room1------------------------------------------//
room1.door1 = new Door(room1, 'door1', 'door01_closed.png', 'door01_open.png', room2)
room1.door1.resize(170)
room1.door1.locate(150, 450)

// 태극기
room1.taegukki = new Object(room1, 'taegukki', 'taegukki.png')
room1.taegukki.resize(130)
room1.taegukki.locate(150,150)

room1.taegukki.onClick = function(){
    showImageViewer("taegukki_origin.png");
    printMessage('아! 나의 조국! 볼 때마다 벅차오른다!')
}

// 복무신조
room1.bokmu = new Object(room1, 'bokmu', 'bokmu.png')
room1.bokmu.resize(65)
room1.bokmu.locate(400,300)

room1.bokmu.onClick = function(){
    showImageViewer("bokmu_origin.jpg");
	printMessage("우리의 결의!")
}

// 휴지통
room1.trashbin = new Object(room1, 'trashbin', 'trashbin.png')
room1.trashbin.resize(100)
room1.trashbin.locate(300,550)

room1.trashbin.onClick = function(){
    printMessage("쓰레기통은 비어있다")
}

// 스위치
room1.light_switch = new Object(room1, 'light_switch', 'light_switch.png')
room1.light_switch.resize(20)
room1.light_switch.locate(270,400)

room1.light_switch.onClick = function(){
    printMessage("딸깍")
}

// 침대 01
room1.bed1 = new Object(room1, 'bed1', 'bed01.png')
room1.bed1.resize(280)
room1.bed1.locate(500,490)

// 관물대 01
room1.gwanmuldae1 = new Object(room1, 'gwanmuldae1', 'gwanmuldae01.png')
room1.gwanmuldae1.resize(160)
room1.gwanmuldae1.locate(700,400)

room1.gwanmuldae1.onClick = function(){
    printMessage("최현진 일병의 관물대다")
}

// 침대 02
room1.bed2 = new Object(room1, 'bed2', 'bed02.png')
room1.bed2.resize(280)
room1.bed2.locate(780,510)

// 관물대 02
room1.gwanmuldae2 = new Object(room1, 'gwanmuldae2', 'gwanmuldae02.png')
room1.gwanmuldae2.resize(180)
room1.gwanmuldae2.locate(950,420)
room1.gwanmuldae2.STATUS = 2

room1.gwanmuldae2.onClick = function(){
	if(room1.gwanmuldae2.STATUS == 2){
		printMessage("박성규 상병의 관물대다, 자물쇠로 굳게 잠겨있다")
		showImageViewer("gwanmulmemo.png")
	}else{
		printMessage("텅 비어있다...")
	}
}

// 관물대 자물쇠
room1.lock = new Keypad(room1, 'lock', 'lock.png', '4231', function(){
	printMessage("철컹")
	playSound("door_open.wav")
	room1.gwanmuldae2.STATUS = 1
})
room1.lock.resize(15)
room1.lock.locate(915,505)

room1.lock.onClick = function(){
	printMessage("박성규의 메모를 다시한 번 살펴볼까?")
	showKeypad('number', this.password, this.callback)
}

// 침대 03
room1.bed3 = new Object(room1, 'bed3', 'bed03.png')
room1.bed3.resize(250)
room1.bed3.locate(1080,530)

// 관물대 03
room1.gwanmuldae3 = new Object(room1, 'gwanmuldae3', 'gwanmuldae03.png')
room1.gwanmuldae3.resize(190)
room1.gwanmuldae3.locate(1290,430)

room1.gwanmuldae3.onClick = function(){
    printMessage("내 관물대다")
}

room1.door1.onClick = function(){
	if (!this.id.isLocked() && this.id.isClosed()){
		this.id.open()
		playSound("door_open.wav")
	}
	else if (this.id.isOpened()){
		if (this.connectedTo !== undefined){
			Game.move(this.connectedTo)
		}
		else {
			Game.end()
		}
	}
}

room2.door1 = new Door(room2, 'door1', 'door02_closed.png', 'door02_open.png', room1)
room2.door1.resize(120)
room2.door1.locate(170, 455)

room2.door1.onClick = function(){
	if (!this.id.isLocked() && this.id.isClosed()){
		this.id.open()
		playSound("door_open.wav")
	}
	else if (this.id.isOpened()){
		if (this.connectedTo !== undefined){
			Game.move(this.connectedTo)
		}
		else {
			Game.end()
		}
	}
}


room2.door2 = new Door(room2, 'door2', 'door03_closed.png', 'door03_open.png', room3)
room2.door2.resize(40)
room2.door2.locate(900, 410)

room2.door2.onClick = function(){
	if (!this.id.isLocked() && this.id.isClosed()){
		this.id.open()
		playSound("door_open.wav")
	}
	else if (this.id.isOpened()){
		if (this.connectedTo !== undefined){
			Game.move(this.connectedTo)
		}
		else {
			Game.end()
		}
	}
}

// 생활관 팻말
room2.dorm = new Object(room2, 'dorm', 'dorm.png')
room2.dorm.resize(150)
room2.dorm.locate(120,240)

// 행정반 팻말
room2.admini = new Object(room2, 'admini', 'admini.png')
room2.admini.resize(50)
room2.admini.locate(900,280)

// 그린 보드
room2.greenboard = new Object(room2, 'greenboard', 'greenboard.png')
room2.greenboard.resize(250)
room2.greenboard.locate(1150,330)

// 보안 포스터
room2.rok_boan = new Object(room2, 'rok_boan', 'rok_boan.png')
room2.rok_boan.resize(20)
room2.rok_boan.locate(1050,350)

room2.rok_boan.onClick = function(){
    showImageViewer("rok_boan_origin.jpg");
	printMessage("흔해빠진 보안 포스터다")
}

// 부사관 포스터
room2.sergent = new Object(room2, 'sergent', 'sergent.png')
room2.sergent.resize(24)
room2.sergent.locate(1080,350)

room2.sergent.onClick = function(){
    showImageViewer("sergent_origin.jpg");
	printMessage("끔찍하다")
}

// 부사관 포스터2
room2.sergent2 = new Object(room2, 'sergent2', 'sergent2.png')
room2.sergent2.resize(28)
room2.sergent2.locate(1115,345)

room2.sergent2.onClick = function(){
    showImageViewer("sergent2_origin.jpg");
	printMessage("끔찍하다2")
}

// 식단표
room2.meal_table = new Object(room2, 'meal_table', 'meal_table.png')
room2.meal_table.resize(70)
room2.meal_table.locate(1200,335)

room2.meal_table.onClick = function(){
    showImageViewer("meal_table_origin.jpg");
	printMessage("고순튀...")
}

// 소화기
room2.fireex = new Object(room2, 'fireex', 'fireex.png')
room2.fireex.resize(100)
room2.fireex.locate(150,630)

// 소화기2
room2.fireex2 = new Object(room2, 'fireex2', 'fireex2.png')
room2.fireex2.resize(30)
room2.fireex2.locate(860,500)

// 화살표
room2.arrow = new Door (room2, 'arrow', 'arrow.png', 'arrow.png', room4)
room2.arrow.resize(130)
room2.arrow.locate(620,660)

room2.arrow.onClick = function(){
	Game.move(this.connectedTo)
	playSound("woosh.wav")
}

// 화살표 2
room4.arrow2 = new Door (room4, 'arrow2', 'arrow.png', 'arrow.png', room2)
room4.arrow2.resize(130)
room4.arrow2.locate(620,660)

room4.arrow2.onClick = function(){
	Game.move(this.connectedTo)
	playSound("woosh.wav")
}

// 천국으로 가는 문
room4.heaven = new Door(room4, 'heaven', 'heaven.png', 'heaven.png')
room4.heaven.resize(685)
room4.heaven.locate(623, 307)

// 전역증
room3.retire = new Item(room3, 'retire', 'retire.jpg')
room3.retire.resize(50)
room3.retire.locate(445, 600)
room3.retire.hide()

// 종결조건
room4.heaven.onClick = function(){
	if (!room3.retire.isHanded()){
		printMessage("??? : 전역증을 가져오너라...")
	}
	else if (room3.retire.isHanded() && !this.id.isLocked() && this.id.isClosed()){
		printMessage("??? : 전역증을 가져왔군... 클릭을 한번 더해서 밖으로 나가거라")
		this.id.open()
	}
	else if (this.id.isOpened()){
		if (this.connectedTo !== undefined){
			Game.move(this.connectedTo)
		}
		else {
			Game.end()
		}
	}
}

// 
room3.door2 = new Door(room3, 'door2', 'door04_closed.png', 'door04_open.png', room2)
room3.door2.resize(195)
room3.door2.locate(230, 405)

room3.door2.onClick = function(){
	if (!this.id.isLocked() && this.id.isClosed()){
		this.id.open()
		playSound("door_open.wav")
	}
	else if (this.id.isOpened()){
		if (this.connectedTo !== undefined){
			Game.move(this.connectedTo)
		}
		else {
			Game.end()
		}
	}
}

// 캐비넷
room3.cabinet = new Object(room3, 'cabinet', 'cabinet.png')
room3.cabinet.resize(150)
room3.cabinet.locate(420,380)
room3.cabinet.STATUS = 2

room3.cabinet.onClick = function(){
	if(room3.cabinet.STATUS == 2){
		printMessage("잠겨있다!")
	}else{
		printMessage("뭐가 떨어졌다. 혹시...!")
		playSound("drop.wav")
		room3.retire.show()
	}
}

// 자물쇠
room3.lock = new Keypad(room3, 'lock', 'lock.png', '2048', function(){
	printMessage("철커덩")
	playSound("door_open.wav")
	room3.cabinet.STATUS = 1
})
room3.lock.resize(20)
room3.lock.locate(420,300)

room3.lock.onClick = function(){
	printMessage("아마 중대장님의 컴퓨터에 적혀있지 않을까...")
	showKeypad('number', this.password, this.callback)
}


// 화분
room3.plant = new Object(room3, 'plant', 'plant.png')
room3.plant.resize(80)
room3.plant.locate(800,450)

room3.plant.onClick = function(){
	printMessage("중대장님이 아끼는 화분이다")
}

// 화살표 3
room3.arrow3 = new Door (room3, 'arrow3', 'arrow_left.png', 'arrow_left.png', room5)
room3.arrow3.resize(150)
room3.arrow3.locate(1100,650)

room3.arrow3.onClick = function(){
	Game.move(this.connectedTo)
	playSound("woosh.wav")
}

// 화살표 4
room5.arrow4 = new Door (room5, 'arrow4', 'arrow_right.png', 'arrow_right.png', room3)
room5.arrow4.resize(150)
room5.arrow4.locate(200,650)

room5.arrow4.onClick = function(){
	Game.move(this.connectedTo)
	playSound("woosh.wav")
}

// 인사계원 테이블
room5.calender_table = new Object(room5, 'calender_table', 'calender_table.png')
room5.calender_table.resize(100)
room5.calender_table.locate(250,410)

room5.calender_table.onClick = function(){
	printMessage("인사계원의 달력이다")
	showImageViewer("calender.jpg")
}

// 소대장 컴퓨터
room5.com_insa = new Object(room5, 'com_insa', 'com_insa.png')
room5.com_insa.resize(100)
room5.com_insa.locate(500,350)

room5.com_insa.onClick = function(){
	printMessage("소대장의 컴퓨터다. 고장난거 같다")
}

// 중대장 컴퓨터
room5.com_jung = new Object(room5, 'com_jung', 'com_jung.png')
room5.com_jung.resize(150)
room5.com_jung.locate(1000,415)
room5.com_jung.STATUS = 2 // 화면 닫힘

room5.com_jung.onClick = function(){
	if(room5.com_jung.STATUS == 2){
		printMessage("중대장의 컴퓨터다. 옆의 본체를 한번 봐볼까..")
		showImageViewer("monitor_blank.png")
	}else{
		printMessage("흠.")
		showImageViewer("monitor_on.png")
	}
}

// 중대장 컴퓨터 본체
room5.computer = new Keypad(room5, 'computer', 'computer.png', '0723', function(){
	printMessage("위잉~")
	playSound("startup.wav")
	room5.com_jung.STATUS = 1 // 화면 열림
})
room5.computer.resize(100)
room5.computer.locate(1200,430)

room5.computer.onClick = function(){
	printMessage("본체가 자물쇠로 잠겨있다")
	showKeypad('number', this.password, this.callback)
}

/*
room2.door2 = new Door(room2, 'door2', '문-오른쪽-닫힘.png', '문-오른쪽-열림.png', room3)
room2.door2.resize(120)
room2.door2.locate(1000, 305)
room2.door2.hide()
*/

/*
room2.keypad1 = new Keypad(room2, 'keypad1', '키패드-우.png', '1234', function(){
	printMessage('스르륵 문이 보인다')
	room2.door2.show()
})
room2.keypad1.resize(20)
room2.keypad1.locate(920, 250)

// onClick 함수를 재정의할 수도 있다
room2.keypad1.onClick = function(){
	printMessage('1234')
	showKeypad('number', this.password, this.callback)
}
*/

/*
room3.door1 = new Door(room3, 'door1', '문-왼쪽-닫힘.png', '문-왼쪽-열림.png', room2)
room3.door1.resize(120)
room3.door1.locate(300, 297)

room3.door2 = new Door(room3, 'door2', '문-오른쪽-닫힘.png', '문-오른쪽-열림.png')
room3.door2.resize(120)
room3.door2.locate(1000, 313)
room3.door2.lock()

room3.lock1 = new DoorLock(room3, 'lock1', '키패드-우.png', '1234', room3.door2, '철커덕')
room3.lock1.resize(20)
room3.lock1.locate(920, 250)
*/

Game.start(room0, '전역증을 잃어버렸다! 전역증을 찾아 군대를 탈출해라!')