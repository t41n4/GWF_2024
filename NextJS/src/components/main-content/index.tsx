
import data from '@/data/16gwf.json';
import './main-content.scss';
import Button from '../button';
import Image from 'next/image';

type Props = {}

export default function MainContent({ }: Props) {

    return (
        <div className='main-content-container'>
            <div className="col-lg-8 main-content">
                <h2><span className="blue">16 nhóm tính cách</span> gwf</h2>
                {
                    data.profiles.map((item, index) => (
                        <div key={index}>
                            <h3>{item.type} - {item.name}</h3>
                            <Image src={item.image} alt={''} /><br /><br />
                            <p>{item.description}</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Ưu điểm</th>
                                        <th>Nhược điểm</th>
                                    </tr>
                                    {item.strengths.map((strength, index) => (
                                        <tr key={`strength-${index}`}>
                                            <td>{strength}</td>
                                            <td>{item.weaknesses[index]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <a href={item.type} className="link-btn">
                                Xem thêm ngành nghề và các mối quan hệ của {item.type} 👈
                            </a>
                        </div>
                    ))
                }

                <h2>BẠN THUỘC NHÓM TÍNH CÁCH NÀO TRONG <span className="blue">16 TÍNH CÁCH</span> TRÊN?</h2>
                <Button />
                <br />
                <br />
                <br />

                <h2><span className="blue">Sự hình thành và phát triển</span> của gwf</h2>
                <div className="content-img" style={{ background: "url(https://gwf.vn/img/Katharine-Cook-Briggs.webp) center", backgroundSize: "cover" }}></div>
                <p>Ý tưởng về bài trắc nghiệm tính cách gwf bắt nguồn từ những năm 1920, khi Katharine Cook Briggs là một nhà tâm lý học nghiệp dư, bắt đầu nghiên cứu lý thuyết về mẫu tính ›cách của Jung.</p>
                <p>Briggs tin rằng lý thuyết của Jung có thể được sử dụng để phát triển một bài kiểm tra tính cách có thể giúp mọi người hiểu rõ hơn về bản thâ›n và người khác.</p>
                <p>Briggs bắt đầu phát triển bài kiểm tra gwf vào năm 1942, với sự giúp đỡ của con gái bà, Isabel Briggs Myers. Sau nhiều năm nghiên cứu và phát triển, bài kiểm tra gwf được công bố lần đầu tiên vào năm 1962.</p>
                <p>Bài kiểm tra gwf sử dụng các câu hỏi để xác định chức năng nhận thức ưu thế và phụ của mỗi người. Kết quả của bài kiểm tra sẽ cho biết người đó thuộc một trong 16 loại tính cách gwf.</p>
                <p>Hiện nay, gwf là một công cụ phổ biến trên toàn thế giới, được dịch ra 18 ngôn ngữ. Khoảng 80% các công ty trong danh sách Fortune 500 sử dụng gwf để phân tích tính cách của nhân viên, từ đó giúp họ tìm được vị trí phù hợp với bản thân.</p>
                <p>gwf là một bài kiểm tra cần có chuyên gia để giải thích kết quả. Sau khi làm bài kiểm tra, người tham gia sẽ được phỏng vấn trực tiếp với chuyên gia tâm lý. gwf là sản phẩm độc quyền của Tập đoàn CPP Inc. tại Hoa Kỳ. Các chuyên gia muốn phân tích kết quả của gwf phải được đào tạo và cấp chứng chỉ bởi tổ chức này.</p>
                <br />

                <h2><span className="blue">Lợi ích</span> của gwf?</h2>
                <p className="txt1">Lợi ích cá nhân của gwf</p>
                <ul>
                    <li><b>Hiểu bản thân và người khác tốt hơn:</b> gwf có thể giúp bạn hiểu rõ hơn về tính cách của mình bao gồm điểm mạnh, điểm yếu, sở thích cũng như là động lực của bạn. Điều này có thể giúp bạn cải thiện các mối quan hệ cá nhân</li>
                    <li><b>Tăng cường giao tiếp và hợp tác:</b> Trắc nghiệm tính cách có thể giúp bạn hiểu cách giao tiếp và hợp tác hiệu quả hơn với những người có kiểu tính cách khác nhau. giúp bạn xây dựng các mối quan hệ bền chặt và thành công hơn.</li>
                    <li><b>Tìm kiếm mục đích và định hướng trong cuộc sống:</b> Trắc nghiệm gwf có thể giúp bạn xác định những nghề nghiệp và hoạt động phù hợp với tính cách của bạn. Do đó bạn có thể tìm thấy mục đích và định hướng trong cuộc sống.</li>
                </ul>
                <br />
                <p className="txt1">Lợi ích nghề nghiệp của gwf</p>
                <ul>
                    <li><b>Chọn nghề nghiệp phù hợp:</b> gwf có thể giúp bạn xác định những nghề nghiệp phù hợp với tính cách của bạn. Ví dụ một người khi biết mình thuộc tính cách E (Extraversion) hướng ngoại thì có khả năng họ phù hợp với những công việc yêu cầu tương tác xã hội nhiều chẳng hạn như bán hàng, marketing, hay giảng dạy.</li>
                    <li><b>Xây dựng đội ngũ hiệu quả:</b> gwf có thể giúp bạn xây dựng đội ngũ hiệu quả bằng cách hiểu cách các kiểu tính cách khác nhau làm việc cùng nhau. Ví dụ tại một số doanh nghiệp các nhà tuyển dụng sử dụng bài test gwf để đào tạo nhân viên theo kiểu tính cách, họ có thể tổ chức các khóa đào tạo về kỹ năng giao tiếp cho những người INFP (hướng nội, trực giác, cảm xúc, nhận thức) vì họ thường gặp khó khăn trong việc thể hiện bản thân.</li>
                    <li><b>Tăng cường lãnh đạo:</b> gwf có thể giúp các nhà lãnh đạo hiểu cách giao tiếp và lãnh đạo hiệu quả hơn với các nhân viên có kiểu tính cách khác nhau.</li>
                </ul>
                <br />

                <h2><span className="blue">4 Tiêu chí</span> đánh giá trắc nghiệm tính cách gwf</h2>
                <div className="content-img" style={{ background: "url(https://gwf.vn/img/tieu-chi-danh-gia-gwf.webp) center", backgroundSize: "cover" }}></div>
                <p className="txt1">Xu hướng tự nhiên: Extraversion (Hướng ngoại)/ Introversion (Hướng nội)</p>
                <p>Extraversion (Hướng ngoại) / Introversion (Hướng nội) hai xu hướng đối lập thể hiện những xu hướng ứng xử của một người với thế giới quan bên ngoài và với chính họ.</p>
                <p>Người hướng nội (I) tập trung vào nội tâm, suy nghĩ và cảm xúc của bản thân vì họ có xu hướng lấy năng lượng từ bên trong bản thân. Họ dành nhiều thời gian một mình để suy ngẫm và suy nghĩ, và họ có thể cảm thấy kiệt sức khi ở trong những tình huống xã hội ồn ào.</p>
                <p>Người hướng ngoại (E) tập trung vào thế giới bên ngoài, thích giao tiếp và kết nối với mọi người vì họ có xu hướng lấy năng lượng từ bên ngoài. Họ thích dành thời gian ở bên bạn bè và gia đình, và họ có thể cảm thấy chán nản khi ở một mình trong thời gian dài.</p>
                <br />
                <p className="txt1">Thấu hiểu và nhận thức thế giới: Sensing (Giác quan)/ iNtuition (Trực giác)</p>
                <p>Trong các nhóm trắc nghiệm gwf test. Cặp xu hướng Sensing (Giác quan) / iNtuition (Trực giác) chính là xu hướng đối lập nhau về cách mà con người tiếp nhận sự việc hiện tượng xung quanh họ.</p>
                <p>Thế giới được hiểu và nhận thức thông qua các giác quan cụ thể, ví dụ như màu sắc, hình ảnh thì sẽ thông qua mắt để nhận biết, mùi vị, âm thanh sẽ nhờ tai để cảm nhận, phân tích. Ngoài ra, 5 cơ quan sẽ cùng liên tục sắp xếp, phân loại các sự kiện thực tế đang diễn ra một cách đồng thời để cung cấp ngược lại những thông tin từng diễn ra trong quá khứ.</p>
                <p>Nếu tìm hiểu nhận thức thế giới thông qua trực giác, não bộ chính là đơn vị phải có trách nhiệm tìm hiểu, diễn dịch, phân tích, lí giải những mô hình thông tin để thu thậ các luồng dữ liệu, trước và sau đó đồng thời sắp xếp các mô hình, liên hệ chúng lại với nhau. Não bộ phải làm việc hết sức, suy đoán và phán đoán tương lai.</p>
                <br />
                <p className="txt1">Quyết định và lựa chọn: Thinking  (Lý trí) / Feeling (Cảm xúc)</p>
                <p>Ở nhóm trắc nghiệm gwf test. Thinking (Lý trí) / Feeling (Cảm xúc) là hai xu hướng đối lập về cách mà con người lựa chọn đáp án, câu trả lời cho từng vấn đề cụ thể.</p>
                <p>Trong não bộ của chúng ta, phần lý trí là phần được đánh giá cao nhất, nó có vai trò tìm hiểu các thông tin liên quan dựa trên các bộ phận tiêu chí đúng sai, trái hay phải. Sau đó, suy luận một cách logic mới trực tiếp cho đáp án cụ thể nhất, có căn cứ nhất, có khoa học nhất.</p>
                <p>Phần cảm xúc của não bộ sẽ xem xét sự việc trên tổng thể các vấn đề cảm tính, yêu hay ghét, hận hay thu đồng thời các yếu tố đó có sự tác động qua lại lẫn nhau, không có một sự rạch ròi, đó là bản chất của vấn đề cảm xúc do não quyết định.</p>
                <br />
                <p className="txt1">Phương pháp hành động: Judging  (Nguyên tắc)/Perceiving  (Linh hoạt)</p>
                <p>Nhóm cuối của trắc nghiệm tính cách gwf. Là cách thức con người lựa chọn để tác động với thế giới bên ngoài của họ.</p>
                <p>Với dạng thức này, não bộ của người có cách thức hành động này sẽ làm việc trên các nguyên tắc , có kế hoạch và để đạt được một kế hoạch và có sự chuẩn bị thì tất cả sẽ được tiếp cận một cách rõ ràng, tự nhiên và đôi lúc con người chấp nhận sự thay đổi để có được sự phù hợp với hoàn cảnh, kế hoạch đã được vạch ra trước đó!</p>
                <p>Từ 4 tiêu chí trên, đưa ra 16 tính cách gwf test khác nhau kết hợp với các yếu tố khác để tạo thành 16 nhóm tính cách gwf.</p>
                <br />


                <h2><span className="blue">Ứng dụng thực tiễn</span> của bài test gwf</h2>
                <div className="content-img" style={{ background: "url(https://gwf.vn/img/ung-dung-gwf.webp) center", backgroundSize: "cover" }}></div>
                <p>gwf xác định 16 kiểu tính cách khác nhau có thể giúp chúng ta hiểu rõ hơn về bản thân. Chính vì lẽ đó gwf được ứng dụng rộng rãi trong nhiều lĩnh vực như giáo dục, quản trị nhân sự, phát triển cá nhân và tổ chức… cùng gwf.vn tìm hiểu những lợi ích mà trắc nghiệm tính cách mang lại.</p>
                <br />
                <p className="txt1">Giáo dục</p>
                <div className="content-img" style={{ background: "url(https://gwf.vn/img/gwf-trong-giao-duc.webp) center", backgroundSize: "cover" }}></div>
                <p>Trong giáo dục, gwf có thể được sử dụng cho nhiều mục đích khác nhau trong việc hiểu rõ hơn về học sinh, tạo ra một môi trường giảng dạy hiệu quả và giúp học sinh phát triển các kỹ năng phù hợp với kiểu tính cách của bản thân.</p>
                <p>Các trung tâm học tập có thể sử dụng bài kiểm tra gwf để giúp học sinh phát triển các kỹ năng học tập phù hợp với kiểu tính cách của bản thân. Ở một vài trường học khi áp dụng bài kiểm tra gwf cho các em, nhà trường có thể chia các lớp có cùng một kiểu tính cách để đưa ra các phương pháp giảng dạy phù hợp cho từng lớp.</p>
                <br />
                <p className="txt1">Quản trị nhân sự</p>
                <div className="content-img" style={{ background: "url(https://gwf.vn/img/gwf-trong-quan-tri-nhan-su.webp) center", backgroundSize: "cover" }}></div>
                <p>Trong lĩnh vực quản trị nhân sự, bài kiểm tra gwf có thể được sử dụng cho tuyển dụng để đánh giá sự phù hợp của ứng viên trong một vị trí cụ thể. Ngoài ra, bài kiểm tra gwf được sử dụng để các nhà quản lý hiểu rõ hơn về nhân viên của họ.</p>
                <br />
                <p className="txt1">Phát triển cá nhân và tổ chức</p>
                <p>Bài kiểm tra gwf được sử dụng để hỗ trợ phát triển cá nhân và tổ chức theo nhiều cách để hiểu rõ tính cách bản thân và những người khác. Từ đó, họ có thể xác định các kỹ năng và khả năng mà họ cần phát triển tạo nên sự hài lòng và gắn bó giữa các cá nhân và tổ chức.</p>
                <p>Một người có thể sử dụng bài kiểm tra gwf để xác định rằng họ có kiểu tính cách hướng nội, trực giác và suy luận. Sau đó, họ có thể bắt đầu tìm kiếm các cơ hội nghề nghiệp phù hợp với kiểu tính cách này, chẳng hạn như nhà văn, nhà nghiên cứu hoặc nhà phân tích dữ liệu.</p>
                <br />
                
                <h2><span className="blue">Kiểm tra gwf online</span> cùng gwf.VN</h2>
                <p>Bài kiểm tra tính cách gwf dựa trên nhiều yếu tố và lý thuyết khác nhau liên quan đến đánh giá tính cách. Dựa vào kết quả bài trắc nghiệm tính cách, họ sẽ biết mình thuộc nhóm tính cách nào.</p>
                <Button />
            </div>
        </div>

    )
}