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
     
      async getpost(slug){
           try {
            return await this.databases.getDocument(
                conf.appwritedatabaseId,
                conf.appwriteCollectionId,
                slug
            )
           } catch (error) {
            console.log("appwrite service :: getCurrentUser::error",error);
            return false
           }
      }
     

      async getposts(queries=[Query.equal("status","active")]){
                   try {
                      return await this.databases.listDocuments(
                        conf.appwritedatabaseId,
                        conf.appwriteCollectionId,
                        queries,

                      ) 
                   } catch (error) {
                    console.log("appwrite service :: getCurrentUser::error",error);
                    return false
                   }
      }

      //file upload services
      async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite service :: getCurrentUser::error",error);
            return false
            
        }
      } 
     

      async deleteFile(FileID){
        try {
              await this.bucket.deleteFile(
                conf.appwritebucketId,
                FileID
              )
              return true
            
        } catch (error) {
           console.log("appwrite service :: getCurrentUser::error",error);
           
        }
      }


      getFilePreview(FileID){
           return this.bucket.getFilePreview(
            conf.appwritebucketId,
            FileID
           )
      }
      
              




      
}


const service= new Service()


export default service