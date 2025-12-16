import Image from "next/image";
import styles from "./artistsection.module.scss";
import TickerWrapper from "@/components/common/TickerWrapper";
import { useRouter } from "next/navigation";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

const ArtistSectionContainer = ({ artistSectionData = {} }) => {
    gsap.registerPlugin(ScrollTrigger);
    const artistContainerRef = useRef(null);
    const twrContainerRef = useRef(null);
    const nextSectionRef = useRef(null);
    const imageRef = useRef(null);

    const svgRef = useRef(null);
    const containerRef = useRef(null);

    // useEffect(() => {
    //     const ctx = gsap.context(() => {
    //         const tl = gsap.timeline({
    //             scrollTrigger: {
    //                 trigger: containerRef.current,
    //                 start: 'top top',
    //                 end: '+=1500',
    //                 scrub: 1,
    //                 pin: true,
    //                 anticipatePin: 1,
    //             },
    //         });

    //         tl.to(svgRef.current, {
    //             scale: 5000,
    //             duration: 1,
    //             ease: 'power1.inOut',
    //         })
    //             .to(svgRef.current, {
    //                 scale: 2,
    //                 duration: 1,
    //                 ease: 'power1.inOut',
    //             });
    //     }, containerRef);

    //     return () => ctx.revert();
    // }, []);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=1500',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            tl.to(svgRef.current, {
                scale: 500,
                duration: 1,
                ease: 'power1.inOut',
            }).to(svgRef.current, {
                scale: 2,
                duration: 1,
                ease: 'power1.inOut',
            });
        },
        { scope: containerRef }
    );


    const router = useRouter();

    // if (!artistSectionData) {
    //     return;
    // }
    const { file_url = "", buttonText = "", buttonLink = "#", artists = [{ artist_name: "Subhadeep" }] } = artistSectionData || {};

    const handleButtonClick = () => {
        if (buttonLink == "#") return;
        router.push(buttonLink)
    }
    return (
        // <section className="w-full h-full relative overflow-hidden" ref={artistContainerRef}>
        //     <section className="w-full h-[150vh] flex justify-center items-center commonBg bg-[#0F1116] relative" ref={twrContainerRef}>
        //         <div className="bg-white flex justify-center items-center w-full h-[150vh]" ref={imageRef}>
        //             <div className="w-32 h-32 relative mx-8">
        //                 <Image src={"/assets/images/twr_svg_logo1.svg"} fill alt="svg logo" className="object-contain" />
        //             </div>
        //         </div>
        //         <section className="w-full h-[150vh] flex flex-col items-center justify-center absolute inset-0 py-8 bg-black -z-10" ref={nextSectionRef}>
        //             <div className={styles.artist_section_image_wrapper}>
        //                 <Image src={file_url || "/assets/images/red_black.png"} alt="artist_section_image" fill className="w-full h-full object-cover" />
        //             </div>
        //             <button className="btn-11 inline-block bg-white text-[#0F1116] font-medium text-sm py-3.5 px-14 md:text-[17px] md:py-[17px] md:px-[73px] overflow-hidden transition-all duration-300 hover:text-white z-50 !mt-[-30px]" onClick={handleButtonClick}>
        //                 {buttonText}
        //             </button>
        //             <div className="absolute">
        //                 <TickerWrapper isRight={true}>
        //                     {[...artists, ...artists]?.map((artists) => (<span className="ticker_item">{artists?.artist_name}</span>))}
        //                 </TickerWrapper>
        //                 <TickerWrapper isRight={false}>
        //                     {[...artists, ...artists]?.map((artists) => (<span className="ticker_item">{artists?.artist_name}</span>))}
        //                 </TickerWrapper>
        //                 <TickerWrapper isRight={true}>
        //                     {[...artists, ...artists]?.map((artists) => (<span className="ticker_item">{artists?.artist_name}</span>))}
        //                 </TickerWrapper>
        //             </div>
        //         </section>
        //     </section>
        // </section>
        <div className="w-full h-screen" ref={containerRef}>
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <div className={styles.heroImage}>
                        <img
                            src={file_url}
                            alt="Hero"
                            className={styles.personImage}
                        />
                    </div>

                    <div className={styles.textLines}>
                        <h1 className={styles.heroTitle}>
                            {[...artists, ...artists]?.map((artists) => (<span className="ticker_item">{artists?.artist_name}</span>))}
                        </h1>
                        <h1 className={styles.heroTitle} style={{ animationDelay: '-10s' }}>
                            {[...artists, ...artists]?.map((artists) => (<span className="ticker_item">{artists?.artist_name}</span>))}
                        </h1>
                        <h1 className={styles.heroTitle} style={{ animationDelay: '-20s' }}>
                            {[...artists, ...artists]?.map((artists) => (<span className="ticker_item">{artists?.artist_name}</span>))}
                        </h1>
                    </div>

                    <button className={styles.signupButton}>SIGN UP</button>
                </div>
                <div className={styles.mask}>
                    <svg
                        ref={svgRef}
                        width="1240"
                        height="1748"
                        viewBox="0 0 1240 1748"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.svg}
                    >
                        <g id="theWhiteRoomsLogo-copy">
                            <path fill="#000000" d="M 488.177032 836.022095 L 488.177032 825.24231 L 549 825.24231 L 549 836.022095 L 524.208008 836.022095 L 524.208008 935 L 512.968994 935 L 512.968994 836.022095 L 488.177032 836.022095 Z" />
                            <path fill="#000000" d="M 483 819.087891 L 752.306885 819.087891 L 755 809 L 483 809 Z" />
                            <path fill="#000000" d="M 483 825.055176 L 724.76947 825.055176 L 734 841.87207 L 483 841.87207 Z" />
                            <path fill="#000000" d="M 621.601013 845.134033 L 614.302002 859.538025 L 607.034973 845.134033 L 596.497986 845.134033 L 609.047974 869.907043 L 586.735962 913.936035 L 567.365967 845.598022 L 557.602966 845.598022 L 584.255981 939.348999 L 614.240967 880.15802 L 644.226013 939.348999 L 668.323975 854.585022 L 683.58197 854.585022 L 683.323975 854.330994 L 683.58197 854.429993 L 700.162964 854.429993 C 706.670959 854.429993 711.164978 855.050049 713.954956 856.13501 C 716.743958 857.375 718.914001 859.079041 720.617981 861.71405 C 722.322998 864.192993 723.096985 867.138 723.096985 870.237 C 723.096985 873.491028 722.32196 876.434998 720.617981 879.070007 C 718.912964 881.704041 716.588989 883.564026 713.644958 884.804016 C 710.545959 886.044006 705.896973 886.664001 699.697998 886.664001 L 683.58197 886.509033 L 722.786987 939.196045 L 734.408997 939.196045 L 700.781982 895.652039 C 708.529968 895.497009 714.729004 894.567017 719.221985 892.55304 C 723.560974 890.539001 727.125 887.593994 729.448975 883.720032 C 731.77301 879.846008 733.013 875.352051 733.013 870.238037 C 733.013 864.040039 731.153015 858.926025 727.743958 854.742004 C 724.179993 850.558044 719.685974 847.769043 714.106995 846.529053 C 710.388 845.754028 703.26001 845.289001 692.877014 845.289001 L 674.281982 845.289001 L 674.281982 845.444031 L 664.209961 845.444031 L 664.209961 845.598999 L 661.269958 845.598999 L 641.744995 913.937012 L 619.481995 869.809998 L 631.981995 845.13501 L 621.599976 845.13501 Z" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default ArtistSectionContainer;