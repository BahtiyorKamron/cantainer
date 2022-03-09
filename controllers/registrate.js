import node from '../lib/fetch.js'
class Registrate {
  static async registrate(bot){
      bot.on('text',async msg => {
        console.log(msg.text.split(","));
        if(msg.text=='/start'){
          // await node.remove('users',{clean:1})
          bot.sendMessage(msg.from.id,"Botdan foydalanish uchun oldin ro'yhatdan o'ting!",{reply_markup:{remove_keyboard:true,inline_keyboard:[
            [
              { text : "Ro'yhatdan o'tish", callback_data : 'registrate' },
              { text : "Kirish", callback_data : "kirish" }
            ]
          ]}})
        }

       let users = await node.get('users')
       let user = users.find(el => el.id==msg.from.id)
       if(user && msg.text){
         if(+user.name == 1){
           let username = users.find( el => el.name == msg.text)
           if(username){
             bot.sendMessage(msg.from.id,"Bu username band\nBoshqa username bilan urinib ko'ring")
           }else{
             let u = await node.put("users",{id : msg.from.id,name : msg.text , password : 1})
             bot.sendMessage(msg.from.id,"Parol yarating")
           }

         }
         let u = users.find(el => el.id==msg.from.id && el.login==1)
         if(u){
           let us = await node.get('users')
           let current_user = us.find( el => el.name==msg.text.split(',')[0] && el.password==msg.text.split(',')[1])
           if(current_user){
             await node.put('users',{
               id:data.from.id,
               login : 0
             })
             bot.sendMessage(msg.from.id,"Siz muvaffaqiyatli kirdingiz",{reply_markup:{inline_keyboard:[
               [
                 { text : "🗄Mening Kontainerim",callback_data :"mening kontainerim" },
                 { text : "⚙️Sozlamalar",callback_data : "sozlamalar" }
               ],
               [
                 { text : "➕Kategoriya qo'shish", callback_data : "add_category" }
               ]
             ]}})
           }else{
             bot.sendMessage(msg.from.id,"Bunday foydalanuvchi topilmadi\nYoki noto'g'ri login yoki parol kiritildi!")
           }

         }
         if(+user.password == 1){
           let u = await node.put("users",{ id : msg.from.id,password : msg.text })

           if(u){
             bot.sendMessage(msg.from.id,"Siz ro'yhatga olindingiz",{reply_markup:{inline_keyboard:[
               [
                 { text : "🗄Mening Kontainerim",callback_data :"mening kontainerim" },
                 { text : "⚙️Sozlamalar",callback_data : "sozlamalar" }
               ],
               [
                 { text : "➕Kategoriya qo'shish", callback_data : "add_category" }
               ]
             ]}})
           }
         }
        if(+user.category==1){

          let category = await node.get('category')
          let c = category.find( el => el.name==msg.text )
          if(!c){
            let category = await node.post('category',{
              user_id : msg.from.id,
              name : msg.text
            })
            if(category){
              bot.sendMessage( msg.from.id,"Kategoriya qo'shildi",{reply_markup:{inline_keyboard:[
                [
                  { text : "🗄Mening Kontainerim",callback_data :"mening kontainerim" },
                  { text : "⚙️Sozlamalar",callback_data : "sozlamalar" }
                ],
                [
                  { text : "➕Kategoriya qo'shish", callback_data : "add_category" }
                ]
              ]}})
            }
           }else{
            bot.sendMessage( msg.from.id,"Bunday nomli kategoriya mavjud",{ reply_markup : {inline_keyboard:[
              [
                { text : "🗄Mening Kontainerim",callback_data :"mening kontainerim" },
                { text : "⚙️Sozlamalar",callback_data : "sozlamalar" }
              ],
              [
                { text : "➕Kategoriya qo'shish", callback_data : "add_category" }
              ]
            ]}})
          }



        }
       }
      })
      bot.on('callback_query',async data => {

        if( data.data == "registrate" ){
          await node.put('users',{
            id:data.from.id,
            login : 0
          })
          bot.deleteMessage(data.from.id,data.message.message_id)
          await node.post('users',{
            id : data.from.id,
            name : 1,
            password : 0
          })
          bot.sendMessage(data.from.id,"Username kiriting:")
        }
        if( data.data == "back_from_category" ){
          bot.deleteMessage(data.from.id,data.message.message_id)

          bot.sendMessage( data.from.id,"Menu",{ reply_markup : {inline_keyboard:[
            [
              { text : "🗄Mening Kontainerim",callback_data :"mening kontainerim" },
              { text : "⚙️Sozlamalar",callback_data : "sozlamalar" }
            ],
            [
              { text : "➕Kategoriya qo'shish", callback_data : "add_category" }
            ]
          ]}})
        }
        if(data.data == "mening kontainerim"){

          bot.deleteMessage(data.from.id,data.message.message_id)

          let category = await node.get('category')

          let k = category.map(el => {
            if(el.user_id==data.from.id){
              return  [
                { text : el.name, callback_data : `category|${el.id}` },
                { text : "➖", callback_data : `remove_category|${el.id}` }
              ]
            }
          })

          k.push([{ text : "🔙Orqaga", callback_data : "back_from_category"}])

          if(k.length>1){
           bot.sendMessage(data.from.id,"Kategoriyalar",{reply_markup:{inline_keyboard:k}})
         }else{


           bot.sendMessage(data.from.id,"Sizda Kategoriyalar yo'q",{reply_markup:{inline_keyboard:k}})
         }
        }
      if( data.data == "add_category" ){
        bot.deleteMessage(data.from.id,data.message.message_id)

        bot.sendMessage(data.from.id,"Kategoriya nomini kiriting:")
        await node.post('users',{
          id : data.from.id,
          category : 1
        })
      }
      if( data.data == "kirish" ){
        bot.sendMessage(data.from.id,"Kirish uchun login va parolni kiriting:\nNamuna : Kamron1804,1234 ",{reply_markup:{remove_keyboard:true}})
        await node.post('users',{
          id:data.from.id,
          login : 1
        })
      }

      })
  }
}
export default Registrate
