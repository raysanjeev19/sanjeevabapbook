export const eventMeshTopicNotes: Record<string, string> = {
  Queues:
    "Queue point-to-point, competing-consumer semantics implement karti hai — har message exactly ek consumer ko milta hai, chahe kai consumer instances ho (work load-balance karne ke liye achha). Message ordering sirf ek queue ke andar ek single consumer ke liye ya same partition/key share karne wale messages ke liye guaranteed hai — global ordering parallel consumers ke saath conflict karta hai.",
  Topics:
    "Topic publish-subscribe/fan-out semantics implement karta hai — har subscriber ko har message ki apni independent copy milti hai. Jab multiple, alag downstream systems ko ek hi event pe independently react karna ho (jaise order-placed event se email notification aur inventory update dono trigger hon), topic use karo.",
  "Publish Subscribe":
    "Pub-sub publisher ko subscribers se decouple karta hai — publisher ko pata/care nahi karna padta kaun sun raha hai. Naye subscribers zero publisher changes ke saath add ho sakte hain, aur har consumer apni pace pe independently process karta hai — ek slow consumer doosron ko block nahi karta, unlike direct synchronous calls.",
  Events:
    "Event payload design mein ek tension hai — bahut thin (sirf ID) forces callback (decoupling undermine hoti hai), bahut fat (poora internal object) tight coupling banata hai publisher ke internal schema se. Right balance: business-relevant fields include karo, event ko meaningful notification ki tarah treat karo, internal state dump nahi.",
  Retry:
    "Agar consumer message process karne mein fail hota hai (error, crash, timeout), broker acknowledgment na milne pe message ko redeliver karta hai — configurable retry count aur backoff delay ke saath. Consumer logic idempotent honi chahiye, kyunki redelivery partial success ke baad bhi ho sakti hai.",
  "Dead Letter Queue":
    "DLQ un messages ko hold karta hai jo saare retries exhaust hone ke baad bhi process nahi ho paaye — infinite retry loop ya silent message loss se bachata hai. DLQ ko monitor/alert karna zaroori hai — waha accumulate ho rahe messages real, unprocessed business events represent karte hain; unmonitored DLQ almost DLQ na hone jaisa hi bura hai.",
};
