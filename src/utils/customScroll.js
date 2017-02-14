import { niceScroll } from '../assets/js/jquery.nicescroll.min.js'
import $ from 'jquery'

export function myNiceScroll(){
  $(".shownumname,.yby-container,.mt-choosed,.arti-wrapper,.favorite-wrapper,.contentWrap").niceScroll({
    cursorcolor: "#8096a8",
    horizrailenabled: false,
    cursorborderradius:'0px',
    cursorminheight:50,
    cursorwidth:'6px',
  });

  $(".share-wrapper,.gaojianSet-kuang,.manuscript-top-main,.list-wrap,.contentWrap").niceScroll({
    cursorcolor: "#8096a8",
    horizrailenabled: false,
    cursorborderradius:'0px',
    cursorminheight:50,
    cursorwidth:'6px',
  });

  $(".mt-deptree").niceScroll({
    cursorcolor: "#8096a8",
    horizrailenabled: true,
    cursorborderradius:'0px',
    background:'#c3cfd6',
    cursorminheight:50,
    cursorwidth:'6px'
  });

  $(".preview-container").niceScroll({
    cursorcolor: "#8096a8",
    horizrailenabled: false,
    cursorborderradius:'0px',
    background:'#c3cfd6',
    cursorminheight:50,
    cursorwidth:'6px'
  });

  $(".comment-scroll").niceScroll({
    cursorcolor: "#8096a8",
    horizrailenabled: true,
    cursorborderradius:'0px',
    background:'#c3cfd6',
    cursorminheight:50,
    cursorwidth:'6px'
  });

  $(".showbox").niceScroll({
    cursorcolor: "#8096a8",
    horizrailenabled: true,
    cursorborderradius:'0px',
    background:'#c3cfd6',
    cursorminheight:50,
    cursorwidth:'6px'
  });

}
