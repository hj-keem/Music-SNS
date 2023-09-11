package com.example.Final_Project_mutso.controller;


import com.example.Final_Project_mutso.dto.FeedDto;
import com.example.Final_Project_mutso.dto.FeedListDto;
import com.example.Final_Project_mutso.entity.CustomUserDetails;
import com.example.Final_Project_mutso.entity.Feed;
import com.example.Final_Project_mutso.entity.UserEntity;
import com.example.Final_Project_mutso.jwt.AuthenticationFacade;
import com.example.Final_Project_mutso.repository.FeedRepository;
import com.example.Final_Project_mutso.repository.UserRepository;
import com.example.Final_Project_mutso.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@Slf4j
@RestController
@RequestMapping("/feed")
@RequiredArgsConstructor
// cors 설정
@CrossOrigin(origins = "*")
public class FeedController {

    private final FeedService feedService;
    private final FileService fileService;
    private final HashtagService hashtagService;
    private final FeedHashtagService feedHashtagService;
    private final AuthenticationFacade authFacade;
    private final FeedRepository feedRepository;


    @GetMapping
    public List<FeedListDto> getFeed() {
        return feedService.readFeedAll();
    }

    @PostMapping(value = "/add",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE)//피드 생성
    // RESTful한 API는 행동의 결과로 반영된 자원의 상태를 반환함이 옳다
    public void create(
            @RequestPart(value = "dto") FeedDto dto,
            @RequestPart(value = "tags") String tags,
            @RequestPart(value = "file") MultipartFile file
    ){
        feedService.createFeed(dto, tags, file);
    }



    @GetMapping("/{feedId}") //피드 상세
    public FeedDto read(
            @PathVariable("feedId") Long feedId)
    {
        return feedService.readFeed(feedId);

    }


    @PutMapping("/{feedId}") // 정보 수정
    public void update(
            @PathVariable("feedId") Long feedId,  // URL의 ID
            @RequestPart("dto") FeedDto dto,  // HTTP Request Body
            @RequestPart(value = "tags") String tags,
            @RequestPart("file") MultipartFile file
    ) {
        UserEntity loginedUser = authFacade.getUser();
        Optional<Feed> feed = feedRepository.findById(feedId);
        if(loginedUser.getId().equals(feed.get().getUser().getId())){
//            feedHashtagService.deleteFeedHashtag(feedId);
//            feedHashtagService.createFeedHashtag(feed.get(), tags);
            fileService.deleteFile(feedId);
//            fileService.updateFile(feedId, file);
            feedService.updateFeed(feedId, dto);

        }

    }



    @DeleteMapping("/{feedId}")//삭제
    public void delete(
            @PathVariable("feedId") Long feedId
    ) {
        UserEntity loginedUser = authFacade.getUser();
        Optional<Feed> feed = feedRepository.findById(feedId);
        System.out.println(loginedUser.getName());
        System.out.println(feed.get().getUser().getName());
        if(loginedUser.getId().equals(feed.get().getUser().getId())){
            fileService.deleteFile(feedId);
            feedService.deleteFeed(feedId);
//            feedHashtagService.deleteFeedHashtag(feedId);
        }

    }

    @PostMapping("/{feedId}/like")// 좋아요 클릭
    public ResponseEntity<String> likeFeed(
            @PathVariable("feedId") Long feedId
    ) {
        UserEntity loginedUser = authFacade.getUser();
        feedService.likeFeed(feedId,loginedUser);
        return ResponseEntity.ok("좋아요가 반영되었습니다.");
    }

    @GetMapping("/{feedId}/like")// 좋아요 개수
    public int likeCnt(
            @PathVariable("feedId") Long feedId
    ) {
        return feedService.getCntFeedLikes(feedId);
    }

    @GetMapping("/hashSearch")
    public List<FeedListDto> searchHash(
            @RequestPart String keyword
//            @RequestParam(value = "page", defaultValue = "1") int page
    ) {
//        Pageable pageable = PageRequest.of(page - 1, 5, Sort.by("id").descending()); // 한 페이지에 표시할 게시글 수를 5로 설정, ID 역순으로 정렬
        List<FeedListDto> feedPage = hashtagService.searchHashtag(keyword);
        return feedPage;
    }

}

