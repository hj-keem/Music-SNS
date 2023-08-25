package com.example.Final_Project_mutso.service;

import com.example.Final_Project_mutso.entity.FeedImage;
import com.example.Final_Project_mutso.repository.FeedImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class FileService {
//    private final FileRepository fileRepository;
//    private final FileConRepository fileConRepository;
    private final FeedImageRepository feedImageRepository;
    public String createFile(MultipartFile file) {
        String fileName = file.getOriginalFilename(); //파일명을 얻어낼 수 있는 메서드!
        long size = file.getSize(); //파일 사이즈

        System.out.println("파일명 : "  + fileName);
        System.out.println("용량크기(byte) : " + size);
        //서버에 저장할 파일이름 fileextension으로 .jsp이런식의  확장자 명을 구함
        String fileExtension = fileName.substring(fileName.lastIndexOf("."),fileName.length());
        String uploadFolder = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";

            /*
		  파일 업로드시 파일명이 동일한 파일이 이미 존재할 수도 있고 사용자가
		  업로드 하는 파일명이 언어 이외의 언어로 되어있을 수 있습니다.
		  타인어를 지원하지 않는 환경에서는 정산 동작이 되지 않습니다.(리눅스가 대표적인 예시)
		  고유한 랜던 문자를 통해 db와 서버에 저장할 파일명을 새롭게 만들어 준다.
		 */

        UUID uuid = UUID.randomUUID();
        System.out.println(uuid.toString());
        String[] uuids = uuid.toString().split("-");

        String uniqueName = uuids[0];
        System.out.println("생성된 고유문자열" + uniqueName);
        System.out.println("확장자명" + fileExtension);

//             java.io.File saveFile = new java.io.File(uploadFolder+"\\"+fileName);

        java.io.File saveFile = new java.io.File(uploadFolder+"\\"+uniqueName + fileExtension);  // 적용 후
        String fileUrl = String.format(System.getProperty("user.dir") + "\\src\\main\\resources\\static\\file\\%s", uniqueName+fileExtension);
//            String fileUrl = uploadFolder+"\\"+fileName;
        try {
            file.transferTo(saveFile); // 실제 파일 저장메서드(filewriter 작업을 손쉽게 한방에 처리해준다.)
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileUrl;
    }

    public String readFile(Long feedId) {//!!!!!!!게시글 id 제발!!!!! file id아니고!!!!
        for (FeedImage feedImage :
                feedImageRepository.findAll()) {

            if (feedImage.getImageUrl() != null){
                if (feedImage.getId().equals(feedId)){
                    String file = feedImage.getImageUrl();
                    return file;
                }
            }

        }
////전해받은 파일아이디를 이용해 file entity를 검색 자료를 반환
//        for (File file :
//        fileRepository.findAll()) {
//            if (file.getId().equals(id))
//                return file;
//        }
//
        return null;
    }


//    public void downFile(File file, HttpServletResponse response) throws IOException {
//        String uploadFolder = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
//
//        java.io.File saveFile = new java.io.File(uploadFolder+"\\"+file.getName());
//
//        // file 다운로드 설정
//        response.setContentType("application/download");
//        response.setContentLength((int)saveFile.length());
//        response.setHeader("Content-disposition", "attachment;filename=\"" + file.getName() + "\"");
//        // response 객체를 통해서 서버로부터 파일 다운로드
//        OutputStream os = response.getOutputStream();
//        // 파일 입력 객체 생성
//        FileInputStream fis = new FileInputStream(saveFile);
//        FileCopyUtils.copy(fis, os);
//        fis.close();
//        os.close();
//    }



}
