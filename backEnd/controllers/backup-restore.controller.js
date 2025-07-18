const {createBackup} = require('../services/backup.service');
const {restoreBackup} = require('../services/restore.service');

exports.createBackup=(req,res)=>{
    try{
    createBackup();
    res.status(200).json({message: 'Database backedup successfully'});
    }
    catch(err){
        res.status(500).json({message: 'backup failed',error:err.message});
    }
}

exports.restore=(req,res)=>{
  try{
    const {folder} = req.body;
    restoreBackup(folder);
   res.status(200).json({message: 'Database restored successfully'});
  }
  catch(err){
 res.status(500).json({message: 'restore failed',error:err.message});
  }

}