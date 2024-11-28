// 



import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import useContractInstance from "../hooks/useContractInstance";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { Box, Flex, Text, Heading, Card } from '@radix-ui/themes';
import { SunIcon, CubeIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cuboid, Sparkles, Zap, Pen} from "lucide-react"
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

function AnimatedStars({ count = 5000 }) {
  const points = useRef();
  const loopTime = 20; // Loop duration in seconds

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = Math.random() * 100 - 50;
    }
    return positions;
  }, [count]);

  const originalPositions = useMemo(() => new Float32Array(particlesPosition), [particlesPosition]);

  useFrame((state, delta) => {
    if (points.current) {
      const elapsedTime = state.clock.getElapsedTime() % loopTime;
      const progress = elapsedTime / loopTime;

      points.current.rotation.x = progress * Math.PI * 2 * 0.1;
      points.current.rotation.y = progress * Math.PI * 2 * 0.15;

      const positions = points.current.geometry.attributes.position.array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const originalZ = originalPositions[i3 + 2];
        
        positions[i3] = originalPositions[i3];
        positions[i3 + 1] = originalPositions[i3 + 1];
        positions[i3 + 2] = originalZ + progress * 100 - 50;

        if (positions[i3 + 2] > 50) {
          positions[i3 + 2] -= 100;
        }
      }

      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

const AnimatedCard = ({ children, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const checkOwner = async () => {
      if (!contract || !address) return;

      try {
        const owner = await contract.owner();
        if (owner.toLowerCase() === address.toLowerCase()) {
          navigate("/ownerPage");
          return;
        }
        const nextOwner = await contract.nextOwner();
        if (nextOwner.toLowerCase() === address.toLowerCase()) {
          navigate("/newOwnerPage");
          return;
        }

        const signers = await contract.getSigners();
        const signer = signers.find(
          (addrr) => addrr.toLowerCase() === address.toLowerCase()
        );

        if (signer) {
          navigate("/transactions");
          return;
        }

        toast.error("You are not authorized on this platform");
      } catch (error) {
        console.error("Error checking owner or signer:", error);
      }
    };

    checkOwner();
  }, [contract, address, navigate]);

  return (
    <Box className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <Box className="relative h-screen">
        <Box className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 1], fov: 60 }}>
            <AnimatedStars />
          </Canvas>
        </Box>
        <Flex direction="column" align="center" justify="center" className="relative z-10 h-full">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Heading size="9" className="mb-6">Decisions</Heading>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Text size="5" className="mb-8 text-blue-300"> On-chain multi-signature platform empowering decentralized funding for grant seekers through community-driven decision-making</Text>
          </motion.div>
        </Flex>
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <SunIcon className="text-yellow-400" width={32} height={32} />
        </motion.div>
      </Box>

      {/* About Section */}
      <Box className="relative min-h-screen bg-gray-900 py-20">
        <motion.div 
          className="relative z-10 h-full flex items-center justify-center"
         
        >
          <div  className="max-w-6xl mx-auto px-4">
            <motion.h2
                className="text-4xl md:text-5xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
             About Onchain Raffle
            </motion.h2>
            <div className="grid md:grid-cols-2 justify-center items-center gap-12">
              <AnimatedCard delay={0.2}>
                <Card className="bg-gray-800 bg-opacity-80 hover:bg-opacity-100 transition-colors duration-300">
                  <Flex direction="column" align="center" className="p-8 h-full">
                    <CubeIcon className="mb-6 text-blue-400" width={60} height={60} />
                    <Heading size="6" className="mb-4">Fully Decentralized</Heading>
                    <Text>Decisions operates on a blockchain, ensuring complete transparency and security in every transaction. No intermediaries, just direct, community-driven decision-making.</Text>
                  </Flex>
                </Card>
              </AnimatedCard>
              <AnimatedCard delay={0.4}>
                <Card className="bg-gray-800 bg-opacity-80 hover:bg-opacity-100 transition-colors duration-300">
                  <Flex direction="column" align="center" className="p-8 h-full">
                    <Sparkles className="mb-6 text-purple-400" width={60} height={60} />
                    <Heading size="6" className="mb-4">Exciting Prizes</Heading>
                    <Text>Explore a variety of innovative and exciting grant opportunities designed to support projects that drive meaningful change. Whether you're building tech or social solutions, there’s a grant for you.</Text>
                  </Flex>
                </Card>
              </AnimatedCard>
              <AnimatedCard delay={0.6}>
                <Card className="bg-gray-800 bg-opacity-80 hover:bg-opacity-100 transition-colors duration-300">
                  <Flex direction="column" align="center" className="p-8 h-full">
                    <Pen className="mb-6 text-[#24f6dd]" width={60} height={60} />
                    <Heading size="6" className="mb-4">Trusted Signers</Heading>
                    <Text> These are authorized individuals or entities who validate and sign off on grant approvals, ensuring the process remains secure, fair, and decentralized.</Text>
                  </Flex>
                </Card>
              </AnimatedCard>
              <AnimatedCard delay={0.6}>
                <Card className="bg-gray-800 bg-opacity-80 hover:bg-opacity-100 transition-colors duration-300">
                  <Flex direction="column" align="center" className="p-8 h-full">
                    <Zap className="mb-6 text-yellow-400" width={60} height={60} />
                    <Heading size="6" className="mb-4">Instant Funding After Approval</Heading>
                    <Text>Once your grant is approved, funds are instantly available. Enjoy fast and seamless access to funding, ensuring you can act on your vision without delays.</Text>
                  </Flex>
                </Card>
              </AnimatedCard>
            </div>
          </div>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Home;