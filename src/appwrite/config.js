import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query, Account } from "appwrite";

export class Service{
    Client = new Client();
    databases;
    bucket;


    constructor(){
        this.Client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
                    this.databases= new Databases(this.Client);
                    this.bucket = new Storage(this.Client)
                   
    }

     async createPost({title,slug,content,featuredImage,status,userId}){
        try {
             return  await  this.databases.createDocument(
                conf.appwritedatabaseId,
                conf.appwriteCollectionId,
                slug,// unique Id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
             )
        } catch (error) {
            console.log("appwrite service :: getCurrentUser::error",error);
            
        }
     }

      async updatePost(slug,{title,content,featuredImage,status}){
        try {
             return await this.databases.updateDocument(
                conf.appwritedatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
             )
        } catch (error) {
            console.log("appwrite service :: getCurrentUser::error",error);
            
        }
      }

      async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwritedatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("appwrite service :: getCurrentUser::error",error);
            return false
        }
      }
     
      async getp
     
}


const service= new Service()


export default service